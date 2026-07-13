import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase, Loader2, Copy, Printer, CheckCircle2, AlertCircle,
  ArrowLeft, RefreshCw, Edit2, Check, ChevronDown, ChevronUp, ChevronRight,
  FileText, Users, BarChart3, Clock, Target, Shield, Star,
  TrendingUp, TrendingDown, AlertTriangle, ThumbsUp, ThumbsDown,
  Download, Search, ArrowUpDown, Filter, Upload, Zap, Award,
  Calendar, UserCheck, Phone, Video, Building, Send, XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoute, useLocation, Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { extractTextFromPDF } from "@/lib/pdf-parser";

// ─── Types ───────────────────────────────────────────────────────────────────

type HiringKitData = {
  linkedInPost?: any;
  hiringSummary?: any;
  interviewPlan?: any;
  techQuestions?: any;
  behavioralQuestions?: any;
  screeningChecklist?: any;
  scorecard?: any;
  inviteEmail?: any;
  offerEmail?: any;
  rejectionEmail?: any;
  hiringTimeline?: any;
  recruiterChecklist?: any;
  candidateRanking?: any;
};

const INTERVIEW_STYLES = [
  "Technical", "Behavioral", "System Design", "Whiteboard", "Take Home", "Panel"
];

const SECTION_LOADING_MESSAGES: Record<string, string> = {
  linkedInPost: "Drafting an engaging LinkedIn Post...",
  hiringSummary: "Synthesizing the Executive Hiring Summary...",
  interviewPlan: "Structuring the round-by-round Interview Plan...",
  techQuestions: "Formulating Technical Interview Questions...",
  behavioralQuestions: "Crafting Behavioral STAR Questions...",
  screeningChecklist: "Preparing the Candidate Screening Checklist...",
  scorecard: "Designing the Evaluation Scorecard...",
  inviteEmail: "Writing the Interview Invitation Email...",
  offerEmail: "Drafting the Offer Letter Email...",
  rejectionEmail: "Composing a respectful Rejection Email...",
  hiringTimeline: "Estimating the Hiring Timeline...",
  recruiterChecklist: "Finalizing the Recruiter Action Checklist...",
  candidateRanking: "Analyzing and ranking candidates...",
};

// ─── Skeleton Loading Component ─────────────────────────────────────────────

function CardSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className={`h-3 skeleton-shimmer rounded ${i === 0 ? 'w-3/4' : i === lines - 1 ? 'w-1/2' : 'w-full'}`} />
        </div>
      ))}
    </div>
  );
}

// ─── Recommendation Badge ───────────────────────────────────────────────────

function RecommendationBadge({ recommendation, matchScore }: { recommendation: string, matchScore?: number }) {
  const styles: Record<string, string> = {
    "Strong Hire": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    "Hire": "bg-green-500/15 text-green-400 border-green-500/25",
    "Interview": "bg-amber-500/15 text-amber-400 border-amber-500/25",
    "On Hold": "bg-orange-500/15 text-orange-400 border-orange-500/25",
    "Reject": "bg-red-500/15 text-red-400 border-red-500/25",
  };
  const style = styles[recommendation] || styles["Interview"];
  
  // Better Match Display (Stars)
  const getStars = (score: number) => {
    if (score >= 90) return "★★★★★";
    if (score >= 80) return "★★★★☆";
    if (score >= 70) return "★★★☆☆";
    if (score >= 60) return "★★☆☆☆";
    return "★☆☆☆☆";
  };

  return (
    <div className="flex flex-col items-end gap-1">
      {matchScore !== undefined && (
        <span className="text-[10px] tracking-widest text-emerald-400 font-bold">{getStars(matchScore)}</span>
      )}
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style}`}>
        {recommendation === "Strong Hire" && <Star className="w-3 h-3" />}
        {recommendation === "Hire" && <ThumbsUp className="w-3 h-3" />}
        {recommendation === "Interview" && <Phone className="w-3 h-3" />}
        {recommendation === "Reject" && <XCircle className="w-3 h-3" />}
        {recommendation}
      </span>
    </div>
  );
}

// ─── Score Bar Component ────────────────────────────────────────────────────

function ScoreBar({ label, score, color = "primary" }: { label: string; score: number; color?: string }) {
  const colors: Record<string, string> = {
    primary: "bg-primary",
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
  };
  const barColor = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-red-500";
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-24 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-medium w-8 text-right tabular-nums">{score}%</span>
    </div>
  );
}

// ─── Timeline Phase Icon ────────────────────────────────────────────────────

function PhaseIcon({ phase }: { phase: string }) {
  const lower = phase.toLowerCase();
  if (lower.includes("posting") || lower.includes("sourcing")) return <Send className="w-4 h-4" />;
  if (lower.includes("screen") || lower.includes("resume")) return <Search className="w-4 h-4" />;
  if (lower.includes("phone")) return <Phone className="w-4 h-4" />;
  if (lower.includes("technical")) return <Target className="w-4 h-4" />;
  if (lower.includes("manager") || lower.includes("panel")) return <Video className="w-4 h-4" />;
  if (lower.includes("reference") || lower.includes("background") || lower.includes("hr")) return <Shield className="w-4 h-4" />;
  if (lower.includes("offer") || lower.includes("negotiation")) return <Award className="w-4 h-4" />;
  if (lower.includes("onboard") || lower.includes("joining")) return <UserCheck className="w-4 h-4" />;
  return <Calendar className="w-4 h-4" />;
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AppPage() {
  const { toast } = useToast();
  const [match, params] = useRoute("/ai-products/recruiter-ai/app/:id");
  const projectId = params?.id !== "new" ? params?.id : null;
  const [, setLocation] = useLocation();
  const { session, user } = useAuth();
  
  // Step state
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  
  // Pipeline State
  const [dbCandidates, setDbCandidates] = useState<any[]>([]);
  const [processStatus, setProcessStatus] = useState<string>("");

  // Form State
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState<Array<{ name: string, parsedText?: string }>>([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [interviewStyles, setInterviewStyles] = useState<string[]>([]);
  const [rounds, setRounds] = useState("");
  const [notes, setNotes] = useState("");

  // Artifact State
  const [artifacts, setArtifacts] = useState<HiringKitData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // UI State
  const [editingCards, setEditingCards] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateSort, setCandidateSort] = useState<"score" | "name">("score");
  const [viewingDetails, setViewingDetails] = useState(false);
  const [processingTimeStr, setProcessingTimeStr] = useState("1m 12s");

  // Fetch Existing Project Data
  const { isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) return null;
      
      const { data: projectData, error: projError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
        
      if (projError) throw projError;

      // Populate form state
      if (projectData.input_data) {
        setJobTitle(projectData.input_data.jobTitle || "");
        setJobDescription(projectData.input_data.jobDescription || "");
        setExperienceLevel(projectData.input_data.experienceLevel || "");
        setCompanySize(projectData.input_data.companySize || "");
        setInterviewStyles(projectData.input_data.interviewStyles || []);
        setRounds(projectData.input_data.rounds || "");
        setNotes(projectData.input_data.notes || "");
        setResumes(projectData.input_data.resumes?.map((r:any) => ({ name: r.name, parsedText: r.text })) || []);
      }

      // Fetch Artifacts
      const { data: artifactsData } = await supabase
        .from('generation_artifacts')
        .select('*')
        .eq('project_id', projectId);

      if (artifactsData && artifactsData.length > 0) {
        const loadedArtifacts: any = {};
        artifactsData.forEach(art => {
          loadedArtifacts[art.artifact_type] = art.content;
        });
        setArtifacts(loadedArtifacts);
        setStep(5);
        setGenerationDone(true);
      } else {
        if (projectData.input_data?.jobTitle) setStep(3);
      }

      // Fetch DB Candidates
      const { data: cands } = await supabase
        .from('candidates')
        .select('*')
        .eq('project_id', projectId);
      if (cands) setDbCandidates(cands);

      return projectData;
    },
    enabled: !!projectId
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newResumes = [...resumes];
    
    for (const file of files) {
      if (file.type !== "application/pdf") {
        toast({ title: "Invalid file", description: `${file.name} is not a PDF.`, variant: "destructive" });
        continue;
      }
      
      const resumeIndex = newResumes.length;
      newResumes.push({ name: file.name, parsedText: undefined });
      setResumes([...newResumes]);
      
      try {
        const text = await extractTextFromPDF(file);
        newResumes[resumeIndex].parsedText = text;
        setResumes([...newResumes]);
      } catch (err) {
        toast({ title: "Error parsing PDF", description: `Failed to parse ${file.name}`, variant: "destructive" });
      }
    }
  };

  const handleProcessCandidates = async () => {
    setIsGenerating(true);
    setProcessStatus("Initializing pipeline...");
    setDbCandidates([]);
    setStep(5); // Show generating screen

    try {
      let currentProjectId = projectId;
      const inputData = { jobTitle, jobDescription, experienceLevel, companySize, interviewStyles, rounds, notes };

      if (!currentProjectId && user) {
        const { data, error } = await supabase.from('projects').insert({
          user_id: user.id,
          product_type: 'recruiter-ai',
          title: `${jobTitle} Hiring Kit`,
          input_data: inputData
        }).select().single();

        if (error) throw error;
        currentProjectId = data.id;
        window.history.replaceState({}, '', `/ai-products/recruiter-ai/app/${currentProjectId}`);
      } else if (currentProjectId) {
        await supabase.from('projects')
          .update({ input_data: inputData })
          .eq('id', currentProjectId);
      }

      const response = await fetch('/api/process-candidates', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          projectId: currentProjectId,
          jobTitle, jobDescription,
          resumes: resumes.map(r => ({ name: r.name, text: r.parsedText }))
        })
      });

      if (!response.ok) throw new Error("Failed to start processing.");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          let eventEndIndex;
          while ((eventEndIndex = buffer.indexOf('\n\n')) !== -1) {
            const line = buffer.slice(0, eventEndIndex);
            buffer = buffer.slice(eventEndIndex + 2);
            
            if (line.startsWith('data: ')) {
              try {
                const payload = JSON.parse(line.replace('data: ', ''));
                if (payload.event === 'status') {
                  setProcessStatus(payload.message);
                } else if (payload.event === 'candidate_processed' || payload.event === 'candidate_failed') {
                  setDbCandidates(prev => [...prev, payload.candidate]);
                  setProcessStatus(`Processed ${payload.progress.current} of ${payload.progress.total} candidates...`);
                } else if (payload.event === 'done') {
                  setProcessStatus("");
                  setIsGenerating(false);
                  setGenerationDone(true);
                  toast({ title: "Success", description: "All candidates processed successfully." });
                } else if (payload.event === 'error') {
                  throw new Error(payload.error);
                }
              } catch (err) {
                console.error("Parse error on chunk:", line, err);
              }
            }
          }
        }
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to connect to API.", variant: "destructive" });
      setIsGenerating(false);
      setStep(4);
    }
  };

  const handleGenerate = async (sectionToRegenerate?: string) => {
    setStep(5);
    if (sectionToRegenerate) {
      setRegeneratingSection(sectionToRegenerate);
      setArtifacts(prev => ({ ...prev, [sectionToRegenerate]: undefined }));
    } else {
      setIsGenerating(true);
      setProcessingTimeStr("1m 12s");
      setArtifacts({});
      setErrors({});
      setGenerationDone(false);
      setViewingDetails(false);
    }

    try {
      let currentProjectId = projectId;

      const inputData = {
        jobTitle, jobDescription, experienceLevel, companySize, interviewStyles, rounds, notes
      };

      if (!currentProjectId && user) {
        const { data, error } = await supabase.from('projects').insert({
          user_id: user.id,
          product_type: 'recruiter-ai',
          title: `${jobTitle} Hiring Kit`,
          input_data: inputData
        }).select().single();

        if (error) throw error;
        currentProjectId = data.id;
        window.history.replaceState({}, '', `/ai-products/recruiter-ai/app/${currentProjectId}`);
      } else if (currentProjectId) {
        await supabase.from('projects')
          .update({ input_data: inputData })
          .eq('id', currentProjectId);
      }

      const response = await fetch('/api/generate-kit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          projectId: currentProjectId,
          jobTitle, jobDescription,
          resumes: resumes.map(r => ({ name: r.name, text: r.parsedText })),
          experienceLevel, companySize, interviewStyles, rounds, notes,
          sectionToRegenerate
        })
      });

      if (!response.ok) throw new Error("Failed to start generation.");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          let eventEndIndex;
          while ((eventEndIndex = buffer.indexOf('\n\n')) !== -1) {
            const line = buffer.slice(0, eventEndIndex);
            buffer = buffer.slice(eventEndIndex + 2);
            
            if (line.startsWith('data: ')) {
              try {
                const payload = JSON.parse(line.replace('data: ', ''));
                if (payload.event === 'done') {
                  if (!sectionToRegenerate) {
                    setGenerationDone(true);
                    setIsGenerating(false);
                    toast({ title: "Success", description: "Hiring Kit generated successfully." });
                  } else {
                    setRegeneratingSection(null);
                    toast({ title: "Regenerated", description: "Section updated successfully." });
                  }
                } else if (payload.error && !payload.artifact) {
                  throw new Error(payload.error);
                } else if (payload.artifact) {
                  if (payload.error) {
                    setErrors(prev => ({ ...prev, [payload.artifact]: payload.error }));
                  } else {
                    setArtifacts(prev => ({ ...prev, [payload.artifact]: payload.data }));
                  }
                }
              } catch (err) {
                console.error("Parse error on chunk:", line, err);
              }
            }
          }
        }
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to connect to API.", variant: "destructive" });
      setIsGenerating(false);
      setRegeneratingSection(null);
      if (!sectionToRegenerate) setStep(3);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "Content copied to clipboard." });
  };

  const printSection = (id: string) => {
    const content = document.getElementById(id);
    if (!content) return;
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow?.document.write('<html><head><title>Print - ' + jobTitle + ' Hiring Kit</title>');
    printWindow?.document.write('<style>body{font-family:Inter,system-ui,sans-serif;padding:40px;line-height:1.6;color:#111;} h1,h2,h3,h4{margin-bottom:8px;} table{width:100%;border-collapse:collapse;margin:16px 0;} th,td{border:1px solid #ddd;padding:12px;text-align:left;} th{background:#f5f5f5;font-weight:600;} .score-box{width:28px;height:28px;border:1.5px solid #333;display:inline-block;border-radius:4px;} ul{margin:8px 0;padding-left:20px;} li{margin:4px 0;}</style>');
    printWindow?.document.write('</head><body>');
    printWindow?.document.write(content.innerHTML);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  };

  const printFullKit = () => {
    window.print();
  };

  const copyFullKit = () => {
    const kitContent = document.getElementById('hiring-kit-output');
    if (kitContent) {
      copyToClipboard(kitContent.innerText);
    }
  };

  const toggleEdit = (key: string) => {
    setEditingCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleExpand = (key: string) => {
    setExpandedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateArtifactData = (key: string, newData: any) => {
    setArtifacts(prev => ({ ...prev, [key]: newData }));
  };

  // ─── Computed Values ────────────────────────────────────────────────────────

  const resumeStats = useMemo(() => {
    const total = resumes.length;
    const processed = resumes.filter(r => r.parsedText).length;
    const failed = resumes.filter(r => r.parsedText === undefined && total > 0).length;
    return { total, processed, failed, processing: total - processed };
  }, [resumes]);

  const candidateData = useMemo(() => {
    let filtered = dbCandidates.filter((c: any) =>
      !candidateSearch || c.name?.toLowerCase().includes(candidateSearch.toLowerCase())
    );

    if (candidateSort === "score") {
      filtered = [...filtered].sort((a: any, b: any) => (b.match_score || 0) - (a.match_score || 0));
    } else {
      filtered = [...filtered].sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
    }

    return { candidates: filtered };
  }, [dbCandidates, candidateSearch, candidateSort]);

  // ─── Render Helpers ─────────────────────────────────────────────────────────

  const renderCard = (
    title: string,
    id: string,
    artifactKey: keyof HiringKitData,
    contentRenderer: (data: any, isEditing: boolean) => React.ReactNode,
    { icon: Icon, accentColor }: { icon?: any; accentColor?: string } = {}
  ) => {
    const data = artifacts[artifactKey];
    const error = errors[artifactKey];
    const isLocalGenerating = (isGenerating && !data && !error) || regeneratingSection === artifactKey;
    const isEditing = !!editingCards[artifactKey];
    const isExpanded = expandedCards[artifactKey] ?? true;

    return (
      <Card id={id} className="border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden flex flex-col h-full break-inside-avoid">
        <CardHeader className="pb-3 border-b border-border/30 flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && (
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${accentColor || 'bg-primary/10 text-primary'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            )}
            <CardTitle className="text-sm font-semibold truncate">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-0.5 print:hidden shrink-0">
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={!data} onClick={() => toggleExpand(artifactKey)} aria-label={isExpanded ? "Collapse" : "Expand"}>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
            </Button>
            {isExpanded && (
              <>
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={!data || isLocalGenerating} onClick={() => handleGenerate(artifactKey)} aria-label="Regenerate">
                  <RefreshCw className={"w-3.5 h-3.5 text-muted-foreground " + (regeneratingSection === artifactKey ? 'animate-spin text-primary' : '')} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={!data} onClick={() => toggleEdit(artifactKey)} aria-label="Edit">
                  {isEditing ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={!data} onClick={() => printSection(id)} aria-label="Print">
                  <Printer className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={!data} onClick={() => {
                  const el = document.getElementById(id);
                  if (el) copyToClipboard(el.innerText);
                }} aria-label="Copy">
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-4 flex-grow overflow-auto">
            {isLocalGenerating && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                  <p className="text-xs animate-pulse">{SECTION_LOADING_MESSAGES[artifactKey] || "Generating..."}</p>
                </div>
                <CardSkeleton lines={5} />
              </div>
            )}
            {error && !data && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-sm text-red-400">{error}</p>
                <Button variant="outline" size="sm" onClick={() => handleGenerate(artifactKey)} className="mt-1">
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Retry
                </Button>
              </div>
            )}
            {data && !isLocalGenerating && contentRenderer(data, isEditing)}
          </CardContent>
        )}
      </Card>
    );
  };

  // ─── Main Render ────────────────────────────────────────────────────────────

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 pb-12 print:pt-0 print:pb-0">
        <div className="container mx-auto max-w-6xl px-4">
          
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between print:hidden">
            <div>
              <div className="flex items-center gap-3">
                <Link href="/ai-products/recruiter-ai/dashboard">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border/50 hover:bg-muted/50" aria-label="Back to dashboard">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Hiring Kit Generator</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Turn your job description into actionable hiring materials.</p>
                </div>
              </div>
            </div>
            {step < 5 && (
              <div className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50 tabular-nums">
                Step {step} of 4
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* ─── Step 1: Job Title ──────────────────────────────────────── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <Card className="border-border/50 max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>What role are you hiring for?</CardTitle>
                    <CardDescription>Enter the job title to get started.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input 
                        placeholder="e.g. Senior Frontend Engineer" 
                        value={jobTitle}
                        onChange={e => setJobTitle(e.target.value)}
                        className="h-12 text-lg bg-background/50"
                        autoFocus
                      />
                    </div>
                    <Button 
                      className="w-full h-12 text-base font-semibold" 
                      onClick={() => setStep(2)}
                      disabled={!jobTitle.trim()}
                    >
                      Next Step
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ─── Step 2: Job Description ────────────────────────────────── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <Card className="border-border/50 max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                    <CardDescription>Paste the job description below, or upload a PDF.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Paste requirements, responsibilities, and company info here..."
                        className="min-h-[250px] bg-background/50 resize-y"
                        value={jobDescription}
                        onChange={e => setJobDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/40" /></div>
                      <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground uppercase tracking-wider">Or Upload File</span></div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Input type="file" accept=".pdf" className="bg-background/50" onChange={handleFileUpload} />
                      {resumes.length > 0 && <span className="text-sm text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Attached</span>}
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                      <Button 
                        className="h-12 px-8 text-base font-semibold" 
                        onClick={() => setStep(3)}
                        disabled={!jobDescription.trim() && resumes.length === 0}
                      >
                        Next Step
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ─── Step 3: Hiring Context ─────────────────────────────────── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <Card className="border-border/50 max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>Hiring Context</CardTitle>
                    <CardDescription>Give the AI context on the company and process to tailor the Hiring Kit.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Experience Level</Label>
                        <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                          <SelectTrigger className="h-10 bg-background/50">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Junior">Junior</SelectItem>
                            <SelectItem value="Mid">Mid</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                            <SelectItem value="Lead">Lead</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Company Size</Label>
                        <Select value={companySize} onValueChange={setCompanySize}>
                          <SelectTrigger className="h-10 bg-background/50">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Startup">Startup</SelectItem>
                            <SelectItem value="Growing">Growing</SelectItem>
                            <SelectItem value="Mid-size">Mid-size</SelectItem>
                            <SelectItem value="Enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Interview Styles (Select all that apply)</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {INTERVIEW_STYLES.map(style => (
                          <div key={style} className="flex items-center space-x-2 bg-muted/30 p-3 rounded-lg border border-border/30">
                            <Checkbox 
                              id={style} 
                              checked={interviewStyles.includes(style)}
                              onCheckedChange={(checked) => {
                                setInterviewStyles(prev => checked ? [...prev, style] : prev.filter(s => s !== style))
                              }}
                            />
                            <label htmlFor={style} className="text-sm font-medium leading-none cursor-pointer">{style}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Number of Rounds</Label>
                        <Select value={rounds} onValueChange={setRounds}>
                          <SelectTrigger className="h-10 bg-background/50">
                            <SelectValue placeholder="Select rounds" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3-4">3-4</SelectItem>
                            <SelectItem value="5+">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes (Optional)</Label>
                      <Textarea 
                        placeholder="Anything else recruiters should know? e.g. 'Must be willing to relocate to Austin, TX'"
                        className="bg-background/50"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between pt-4 border-t border-border/30">
                      <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                      <Button 
                        className="h-12 px-8 text-base font-semibold" 
                        onClick={() => setStep(4)}
                        disabled={!experienceLevel || !companySize || interviewStyles.length === 0 || !rounds}
                      >
                        Next Step
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ─── Step 4: Resume Upload ──────────────────────────────────── */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <Card className="border-border/50 max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Upload Candidate Resumes</CardTitle>
                    <CardDescription>Upload up to 100 PDF resumes to have RecruiterAI automatically evaluate and rank them against your job requirements.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-border/40 rounded-xl p-8 text-center hover:bg-muted/30 transition-colors relative">
                      <Input type="file" multiple accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} />
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-semibold text-sm">Drop PDF resumes here</p>
                      <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                    </div>

                    {resumes.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Uploaded Resumes ({resumes.length})</Label>
                          <span className="text-xs text-muted-foreground">
                            {resumeStats.processed}/{resumeStats.total} processed
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                            style={{ width: `${resumeStats.total > 0 ? (resumeStats.processed / resumeStats.total) * 100 : 0}%` }} 
                          />
                        </div>
                        <div className="max-h-40 overflow-y-auto space-y-1.5 pr-2">
                          {resumes.map((r, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-border/30 bg-muted/20">
                              <span className="text-xs truncate mr-4">{r.name}</span>
                              {r.parsedText ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Loader2 className="w-3.5 h-3.5 animate-spin text-primary shrink-0" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-4 border-t border-border/30">
                      <Button variant="ghost" onClick={() => setStep(3)}>Back</Button>
                      <Button 
                        className="h-12 px-8 text-base font-semibold" 
                        onClick={() => handleProcessCandidates()}
                        disabled={resumes.some(r => !r.parsedText)}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Process Candidates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ─── Step 5: Results ────────────────────────────────────────── */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} id="hiring-kit-output">
                
                {/* Generation Progress Bar */}
                {isGenerating && (
                  <div className="flex flex-col gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5 text-primary max-w-3xl mx-auto mb-8">
                    <div className="flex items-center gap-3 font-medium">
                      <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                      <span>{processStatus}</span>
                    </div>
                  </div>
                )}

                {/* ─── Export Toolbar ──────────────────────────────────────── */}
                {generationDone && viewingDetails && (
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm mb-8 print:hidden">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{jobTitle} — Hiring Kit</h3>
                        <p className="text-xs text-muted-foreground">{dbCandidates.length} candidates • {experienceLevel} • {companySize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setViewingDetails(false)}>
                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Candidate List
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={copyFullKit}>
                        <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy All
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={printFullKit}>
                        <Printer className="w-3.5 h-3.5 mr-1.5" /> Print
                      </Button>
                      <Button size="sm" className="h-8 text-xs" onClick={printFullKit}>
                        <Download className="w-3.5 h-3.5 mr-1.5" /> Export PDF
                      </Button>
                    </div>
                  </div>
                )}

                {/* ─── Executive Summary Banner ───────────────────────────── */}
                {generationDone && viewingDetails && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                    <div className="p-3 rounded-xl border border-border/40 bg-card/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Total Resumes</p>
                      <p className="text-xl font-bold tabular-nums">{dbCandidates.length}</p>
                    </div>
                    <div className="p-3 rounded-xl border border-border/40 bg-card/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Shortlisted</p>
                      <p className="text-xl font-bold tabular-nums text-emerald-400">
                        {dbCandidates.filter(c => ['Strong Hire', 'Hire', 'Interview', 'Highly Recommended', 'Recommended', 'Worth Interviewing'].includes(c.recommendation)).length}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl border border-border/40 bg-card/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Avg. Match</p>
                      <p className="text-xl font-bold tabular-nums">
                        {dbCandidates.length 
                          ? Math.round(dbCandidates.reduce((acc, c) => acc + (c.match_score || 0), 0) / dbCandidates.length) + '%'
                          : '—'}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl border border-border/40 bg-card/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Top Match</p>
                      <p className="text-xl font-bold tabular-nums text-primary">
                        {dbCandidates.length 
                          ? Math.max(...dbCandidates.map(c => c.match_score || 0)) + '%'
                          : '—'}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl border border-border/40 bg-card/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Time Saved</p>
                      <p className="text-xl font-bold tabular-nums text-purple-400">
                        {Math.max(1, Math.round(resumes.length * 0.5))} hrs
                      </p>
                    </div>
                    <div className="p-3 rounded-xl border border-border/40 bg-card/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Confidence</p>
                      <p className="text-xl font-bold tabular-nums text-blue-400">
                        High
                      </p>
                    </div>
                  </div>
                )}

                {/* ─── Processing Summary & Candidate Table ──────────────── */}
                {generationDone && !viewingDetails && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Resume Processing Summary */}
                    <div className="bg-card/50 border border-border/40 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Resume Processing Complete</h3>
                          <p className="text-sm text-muted-foreground">Successfully analyzed and ranked all candidates against {jobTitle} requirements.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total Resumes</p>
                          <p className="text-2xl font-bold tabular-nums">{dbCandidates.length}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Processed</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Rejected</p>
                          <p className="text-2xl font-bold tabular-nums text-red-400">{resumes.filter(r => !r.parsedText).length}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Processing Time</p>
                          <p className="text-2xl font-bold tabular-nums text-primary">{processingTimeStr}</p>
                        </div>
                      </div>
                    </div>

                    {/* Candidate Table */}
                    <div className="bg-card/50 border border-border/40 rounded-xl overflow-hidden">
                      <div className="p-4 border-b border-border/40 flex items-center justify-between bg-muted/20">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold">Candidate Roster</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                            <Input 
                              placeholder="Search..." 
                              className="h-8 text-xs pl-8 bg-background/50 w-48"
                              value={candidateSearch}
                              onChange={e => setCandidateSearch(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs text-muted-foreground bg-muted/10 border-b border-border/30">
                            <tr>
                              <th className="px-4 py-3 font-semibold w-1/4">Candidate Name</th>
                              <th className="px-4 py-3 font-semibold text-center w-24">Match</th>
                              <th className="px-4 py-3 font-semibold">Recommendation</th>
                              <th className="px-4 py-3 font-semibold">Status</th>
                              <th className="px-4 py-3 font-semibold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/20">
                            {candidateData?.candidates?.map((c: any, i: number) => (
                              <tr key={i} className="hover:bg-muted/10 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="font-semibold">{c.name}</div>
                                  {c.parsed_data?.currentRole && <div className="text-xs text-muted-foreground truncate max-w-[200px]">{c.parsed_data.currentRole}</div>}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <div className={`font-bold tabular-nums ${(c.match_score) >= 80 ? 'text-emerald-400' : (c.match_score) >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                                    {c.match_score || 0}%
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <RecommendationBadge recommendation={c.recommendation || "Needs Review"} />
                                </td>
                                <td className="px-4 py-3">
                                  {c.status === 'parsing_failed' ? (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-medium">Failed</span>
                                  ) : (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c.stage || 'Sourced'}</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold hover:bg-primary/10 hover:text-primary" onClick={() => setViewingDetails(true)}>
                                    View Details <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                            {!candidateData?.candidates?.length && (
                              <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">
                                  No candidates found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="p-4 border-t border-border/40 bg-muted/10 flex justify-end">
                        <Button className="h-10 text-sm font-semibold" onClick={() => setViewingDetails(true)}>
                          Open Full Hiring Kit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {viewingDetails && (
                  <div className="space-y-10 animate-in fade-in duration-500">

                {/* ─── Section: Candidate Ranking ─────────────────────────── */}
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold border-b border-border/30 pb-2">Candidate Comparison & Ranking</h2>
                  
                  {renderCard("Candidate Comparison", "artifact-ranking", "candidateRanking", (data, isEditing) => (
                    isEditing ? (
                      <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("candidateRanking", JSON.parse(e.target.value)); } catch(e){} }} />
                    ) : (
                      <div className="space-y-4">
                        {data.summary && <p className="text-sm text-muted-foreground">{data.summary}</p>}
                        
                        {/* Candidate Search & Sort */}
                        {data.candidates?.length > 0 && (
                          <div className="flex items-center gap-2 print:hidden">
                            <div className="relative flex-1">
                              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                              <Input 
                                placeholder="Search candidates..." 
                                className="h-8 text-xs pl-8 bg-background/50"
                                value={candidateSearch}
                                onChange={e => setCandidateSearch(e.target.value)}
                              />
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setCandidateSort(s => s === "score" ? "name" : "score")}>
                              <ArrowUpDown className="w-3 h-3 mr-1" />
                              {candidateSort === "score" ? "By Score" : "By Name"}
                            </Button>
                          </div>
                        )}

                        {/* Candidate Cards */}
                        <div className="space-y-3">
                          {(candidateData?.candidates || data.candidates)?.map((c: any, i: number) => (
                            <div key={i} className="bg-muted/20 p-4 rounded-xl border border-border/30 relative overflow-hidden">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-base truncate">{c.name}</h4>
                                    <RecommendationBadge recommendation={c.hiringRecommendation || c.recommendation || "Interview"} matchScore={c.overallMatch || c.matchScore} />
                                  </div>
                                  {c.currentRole && <p className="text-xs text-muted-foreground">{c.currentRole}{c.experience ? ` • ${c.experience}` : ''}</p>}
                                </div>
                                <div className="text-right shrink-0 ml-3">
                                  <div className={`text-2xl font-bold tabular-nums ${(c.overallMatch || c.matchScore) >= 80 ? 'text-emerald-400' : (c.overallMatch || c.matchScore) >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                                    {c.overallMatch || c.matchScore}%
                                  </div>
                                  <p className="text-[10px] text-muted-foreground">Overall Match</p>
                                </div>
                              </div>

                              {/* Score Bars */}
                              {(c.technicalMatch || c.experienceMatch || c.communicationScore || c.cultureFit) && (
                                <div className="space-y-1.5 mb-4 py-3 border-y border-border/20">
                                  {c.technicalMatch && <ScoreBar label="Technical" score={c.technicalMatch} />}
                                  {c.experienceMatch && <ScoreBar label="Experience" score={c.experienceMatch} />}
                                  {c.communicationScore && <ScoreBar label="Communication" score={c.communicationScore} />}
                                  {c.cultureFit && <ScoreBar label="Culture Fit" score={c.cultureFit} />}
                                  {c.confidenceScore && <ScoreBar label="AI Confidence" score={c.confidenceScore} />}
                                </div>
                              )}

                              {/* Recommendation Reasoning */}
                              {c.recommendationReasoning && (
                                <p className="text-xs text-muted-foreground mb-3 italic">"{c.recommendationReasoning}"</p>
                              )}
                              
                              {/* Details Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {c.strengths?.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                      <ThumbsUp className="w-3 h-3 text-emerald-400" />
                                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Strengths</span>
                                    </div>
                                    <ul className="text-xs space-y-0.5 text-muted-foreground">
                                      {c.strengths.map((s: string, idx: number) => <li key={idx} className="flex gap-1.5 items-start"><span className="text-emerald-400 mt-1 shrink-0">•</span>{s}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {c.weaknesses?.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                      <TrendingDown className="w-3 h-3 text-amber-400" />
                                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Gaps</span>
                                    </div>
                                    <ul className="text-xs space-y-0.5 text-muted-foreground">
                                      {c.weaknesses.map((w: string, idx: number) => <li key={idx} className="flex gap-1.5 items-start"><span className="text-amber-400 mt-1 shrink-0">•</span>{w}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {c.greenFlags?.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                      <Shield className="w-3 h-3 text-emerald-400" />
                                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Green Flags</span>
                                    </div>
                                    <ul className="text-xs space-y-0.5 text-muted-foreground">
                                      {c.greenFlags.map((f: string, idx: number) => <li key={idx} className="flex gap-1.5 items-start"><span className="text-emerald-400 mt-1 shrink-0">✓</span>{f}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {c.riskFlags?.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                      <AlertTriangle className="w-3 h-3 text-red-400" />
                                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Risk Flags</span>
                                    </div>
                                    <ul className="text-xs space-y-0.5 text-muted-foreground">
                                      {c.riskFlags.map((f: string, idx: number) => <li key={idx} className="flex gap-1.5 items-start"><span className="text-red-400 mt-1 shrink-0">⚠</span>{f}</li>)}
                                    </ul>
                                  </div>
                                )}
                              </div>

                              {/* Missing Skills & Interview Focus */}
                              {(c.missingSkills?.length > 0 || c.suggestedInterviewFocus) && (
                                <div className="mt-3 pt-3 border-t border-border/20 space-y-2">
                                  {c.missingSkills?.length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold shrink-0 mt-0.5">Missing:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {c.missingSkills.map((s: string, idx: number) => (
                                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">{s}</span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {c.suggestedInterviewFocus && (
                                    <p className="text-[10px] text-muted-foreground"><span className="font-semibold text-foreground">Interview Focus:</span> {c.suggestedInterviewFocus}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ), { icon: Users, accentColor: "bg-primary/10 text-primary" })}
                </section>

                {/* ─── Section: Executive Overview ─────────────────────────── */}
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold border-b border-border/30 pb-2">Executive Hiring Kit Overview</h2>
                  
                  {renderCard("Hiring Summary", "artifact-summary", "hiringSummary", (data, isEditing) => (
                    isEditing ? (
                      <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("hiringSummary", JSON.parse(e.target.value)); } catch(e){} }} />
                    ) : (
                      <div className="space-y-4 text-sm">
                        <div className="bg-muted/20 p-4 rounded-xl border border-border/20">
                          <strong className="text-primary text-xs uppercase tracking-wider block mb-2">Ideal Candidate Profile</strong>
                          <p className="text-muted-foreground text-sm leading-relaxed">{data.idealProfile}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <strong className="text-primary text-xs uppercase tracking-wider">Must Have Skills</strong>
                            <ul className="list-disc pl-4 text-muted-foreground text-sm space-y-1">{data.mustHaveSkills?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                          </div>
                          <div className="space-y-2">
                            <strong className="text-primary text-xs uppercase tracking-wider">Nice to Have</strong>
                            <ul className="list-disc pl-4 text-muted-foreground text-sm space-y-1">{data.niceToHaveSkills?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <strong className="text-primary text-xs uppercase tracking-wider">Core Responsibilities</strong>
                          <ul className="list-disc pl-4 text-muted-foreground text-sm space-y-1">{data.responsibilities?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                        </div>
                      </div>
                    )
                  ), { icon: FileText, accentColor: "bg-blue-500/10 text-blue-400" })}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hiring Timeline */}
                    {renderCard("Hiring Timeline", "artifact-timeline", "hiringTimeline", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[150px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("hiringTimeline", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="space-y-0 relative">
                          {/* Vertical connector line */}
                          <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border/40" />
                          {data.timeline?.map((t: any, i: number) => (
                            <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
                              <div className="w-8 h-8 rounded-full bg-muted/50 border border-border/40 flex items-center justify-center shrink-0 z-10 text-primary">
                                <PhaseIcon phase={t.phase || t.week || ""} />
                              </div>
                              <div className="pt-1 min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h4 className="text-sm font-semibold truncate">{t.phase || t.week}</h4>
                                  {t.duration && <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted/40 shrink-0">{t.duration}</span>}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{t.activity}</p>
                                {t.milestone && <p className="text-[10px] text-primary mt-1 font-medium">✓ {t.milestone}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    ), { icon: Calendar, accentColor: "bg-amber-500/10 text-amber-400" })}
                    
                    {/* Recruiter Checklist */}
                    {renderCard("Recruiter Action Checklist", "artifact-recruiter-checklist", "recruiterChecklist", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[150px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("recruiterChecklist", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="space-y-2">
                          {/* Progress */}
                          {(() => {
                            const items = data.checklist || [];
                            const total = items.length;
                            const checked = Object.values(checklistState).filter(Boolean).length;
                            const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
                            return (
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-xs text-muted-foreground tabular-nums">{checked}/{total}</span>
                              </div>
                            );
                          })()}
                          <div className="space-y-1.5">
                            {(data.checklist || []).map((item: any, i: number) => {
                              const task = typeof item === 'string' ? item : item.task;
                              const category = typeof item === 'object' ? item.category : null;
                              const key = `checklist-${i}`;
                              return (
                                <label key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/20 bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors">
                                  <Checkbox 
                                    className="mt-0.5 border-border/40 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                    checked={!!checklistState[key]}
                                    onCheckedChange={(checked) => setChecklistState(prev => ({ ...prev, [key]: !!checked }))}
                                  />
                                  <div className="min-w-0">
                                    <span className={`text-xs leading-relaxed ${checklistState[key] ? 'line-through text-muted-foreground' : ''}`}>{task}</span>
                                    {category && <span className="text-[10px] text-muted-foreground block mt-0.5">{category}</span>}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )
                    ), { icon: CheckCircle2, accentColor: "bg-emerald-500/10 text-emerald-400" })}
                  </div>
                </section>

                {/* ─── Section: Interview Process ─────────────────────────── */}
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold border-b border-border/30 pb-2">Interview Process & Evaluation</h2>
                  
                  {renderCard("Round-by-Round Interview Plan", "artifact-plan", "interviewPlan", (data, isEditing) => (
                    isEditing ? (
                      <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("interviewPlan", JSON.parse(e.target.value)); } catch(e){} }} />
                    ) : (
                      <div className="space-y-3">
                        {data.rounds?.map((r: any, i: number) => (
                          <div key={i} className="bg-muted/20 p-4 rounded-xl border border-border/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                            <div className="flex justify-between items-start mb-2 ml-2">
                              <h4 className="font-semibold text-sm">{r.roundName}</h4>
                              <span className="px-2 py-0.5 rounded-full bg-muted/50 text-[10px] font-medium text-muted-foreground shrink-0">{r.duration}</span>
                            </div>
                            <p className="text-xs text-primary mb-1 ml-2"><span className="text-foreground font-medium">Interviewer:</span> {r.interviewer}</p>
                            <p className="text-xs text-muted-foreground mb-3 ml-2">{r.goal}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-border/15 ml-2">
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Evaluation Criteria</span>
                                <ul className="text-xs space-y-0.5 list-disc pl-3.5 text-muted-foreground">
                                  {r.evaluationCriteria?.map((c: string, idx: number) => <li key={idx}>{c}</li>)}
                                </ul>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Sample Questions</span>
                                <ul className="text-xs space-y-0.5 list-disc pl-3.5 text-muted-foreground">
                                  {r.sampleQuestions?.map((q: string, idx: number) => <li key={idx}>{q}</li>)}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ), { icon: Target, accentColor: "bg-indigo-500/10 text-indigo-400" })}

                  {renderCard("Candidate Evaluation Scorecard", "artifact-scorecard", "scorecard", (data, isEditing) => (
                    isEditing ? (
                      <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("scorecard", JSON.parse(e.target.value)); } catch(e){} }} />
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-muted/30">
                              <th className="p-3 border border-border/30 font-semibold">Category</th>
                              <th className="p-3 border border-border/30 font-semibold text-center w-14">Weight</th>
                              <th className="p-3 border border-border/30 font-semibold text-center w-10">1</th>
                              <th className="p-3 border border-border/30 font-semibold text-center w-10">2</th>
                              <th className="p-3 border border-border/30 font-semibold text-center w-10">3</th>
                              <th className="p-3 border border-border/30 font-semibold text-center w-10">4</th>
                              <th className="p-3 border border-border/30 font-semibold text-center w-10">5</th>
                              <th className="p-3 border border-border/30 font-semibold w-32">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.categories?.map((c: any, i: number) => (
                              <tr key={i} className="border-b border-border/20">
                                <td className="p-3 border border-border/30">
                                  <div className="font-semibold text-primary mb-0.5">{c.name}</div>
                                  <div className="text-[10px] text-muted-foreground">{c.description}</div>
                                </td>
                                <td className="p-3 border border-border/30 text-center font-medium text-muted-foreground">
                                  {c.weight ? `${c.weight}%` : '—'}
                                </td>
                                {[1, 2, 3, 4, 5].map(score => (
                                  <td key={score} className="p-3 border border-border/30 text-center">
                                    <div className="w-5 h-5 rounded border border-border/40 mx-auto print:border-black" />
                                  </td>
                                ))}
                                <td className="p-3 border border-border/30" />
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {data.scoringGuide && (
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                            {Object.entries(data.scoringGuide).map(([k, v]) => (
                              <span key={k}><strong>{k}</strong> = {v as string}</span>
                            ))}
                          </div>
                        )}
                        {data.overallRecommendation && (
                          <div className="mt-3 p-3 bg-primary/5 border border-primary/15 rounded-lg">
                            <p className="text-xs text-muted-foreground"><span className="font-semibold text-primary">Overall Recommendation Guide:</span> {data.overallRecommendation}</p>
                          </div>
                        )}
                      </div>
                    )
                  ), { icon: Award, accentColor: "bg-purple-500/10 text-purple-400" })}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {renderCard("Technical Interview Questions", "artifact-tech", "techQuestions", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("techQuestions", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="space-y-3">
                          {data.questions?.map((q: any, i: number) => (
                            <div key={i} className="bg-muted/20 p-3.5 rounded-xl border border-border/20">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] uppercase font-semibold text-primary tracking-wider">{q.category}</span>
                                {q.difficulty && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${q.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400' : q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{q.difficulty}</span>}
                              </div>
                              <p className="text-sm font-medium mb-2">{q.question}</p>
                              <div className="bg-muted/30 p-2.5 rounded text-xs text-muted-foreground border-l-2 border-primary/40">
                                <strong className="text-foreground">Listen for:</strong> {q.expectedAnswer}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    ), { icon: Target, accentColor: "bg-blue-500/10 text-blue-400" })}

                    {renderCard("Behavioral STAR Questions", "artifact-behavioral", "behavioralQuestions", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("behavioralQuestions", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="space-y-3">
                          {data.questions?.map((q: any, i: number) => (
                            <div key={i} className="bg-muted/20 p-3.5 rounded-xl border border-border/20">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] uppercase font-semibold text-purple-400 tracking-wider">{q.category}</span>
                                {q.difficulty && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${q.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400' : q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{q.difficulty}</span>}
                              </div>
                              <p className="text-sm font-medium mb-2">{q.question}</p>
                              <div className="bg-muted/30 p-2.5 rounded text-xs text-muted-foreground border-l-2 border-purple-500/40">
                                <strong className="text-foreground">Listen for:</strong> {q.expectedAnswer}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    ), { icon: Users, accentColor: "bg-purple-500/10 text-purple-400" })}
                  </div>

                  {renderCard("Screening Checklist", "artifact-screening", "screeningChecklist", (data, isEditing) => (
                    isEditing ? (
                      <Textarea className="min-h-[150px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("screeningChecklist", JSON.parse(e.target.value)); } catch(e){} }} />
                    ) : (
                      <ul className="space-y-2 bg-muted/20 p-4 rounded-xl border border-border/20">
                        {data.checklist?.map((c: string, i: number) => (
                          <li key={i} className="flex gap-2.5 text-xs items-start">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{c}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  ), { icon: Shield, accentColor: "bg-cyan-500/10 text-cyan-400" })}
                </section>

                {/* ─── Section: Communications ────────────────────────────── */}
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold border-b border-border/30 pb-2">Outreach & Communications</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {renderCard("Optimized LinkedIn Post", "artifact-linkedin", "linkedInPost", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[250px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("linkedInPost", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/20 p-4 rounded-xl border border-border/20">{data.content}</div>
                      )
                    ), { icon: Send, accentColor: "bg-blue-500/10 text-blue-400" })}

                    {renderCard("Interview Invitation Email", "artifact-invite", "inviteEmail", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("inviteEmail", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="space-y-3 text-sm bg-muted/20 p-4 rounded-xl border border-border/20">
                          <div className="border-b border-border/20 pb-2"><strong className="text-muted-foreground text-xs mr-2">Subject:</strong> <span className="text-sm">{data.subject}</span></div>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.body}</div>
                        </div>
                      )
                    ), { icon: Send, accentColor: "bg-green-500/10 text-green-400" })}
                    
                    {renderCard("Offer Letter Email", "artifact-offer", "offerEmail", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("offerEmail", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="space-y-3 text-sm bg-muted/20 p-4 rounded-xl border border-border/20">
                          <div className="border-b border-border/20 pb-2"><strong className="text-muted-foreground text-xs mr-2">Subject:</strong> <span className="text-sm">{data.subject}</span></div>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.body}</div>
                        </div>
                      )
                    ), { icon: Award, accentColor: "bg-emerald-500/10 text-emerald-400" })}

                    {renderCard("Rejection Email Template", "artifact-rejection", "rejectionEmail", (data, isEditing) => (
                      isEditing ? (
                        <Textarea className="min-h-[200px] font-mono text-xs" defaultValue={JSON.stringify(data, null, 2)} onBlur={(e) => { try { updateArtifactData("rejectionEmail", JSON.parse(e.target.value)); } catch(e){} }} />
                      ) : (
                        <div className="space-y-3 text-sm bg-muted/20 p-4 rounded-xl border border-border/20">
                          <div className="border-b border-border/20 pb-2"><strong className="text-muted-foreground text-xs mr-2">Subject:</strong> <span className="text-sm">{data.subject}</span></div>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.body}</div>
                        </div>
                      )
                    ), { icon: Send, accentColor: "bg-red-500/10 text-red-400" })}
                  </div>
                </section>

                </div>
                )}

                {generationDone && !viewingDetails && (
                  <div className="flex justify-center mt-10 pt-8 border-t border-border/30 print:hidden">
                    <Button variant="outline" className="h-10 px-6 rounded-full border-border/40 text-sm" onClick={() => { setStep(1); setArtifacts({}); setGenerationDone(false); setViewingDetails(false); }}>
                      Start New Job Requisition
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  );
}
