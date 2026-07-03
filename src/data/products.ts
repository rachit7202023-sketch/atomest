import { Type, Braces, Link as LinkIcon, Hash, Fingerprint, CalendarClock, Shield, QrCode, Dices, Shuffle, Coins, FileJson, Image as ImageIcon, FileImage, Palette, Droplet, Brush, Calculator, Percent, Landmark, Activity, AlignLeft, ArrowDownUp, Minimize, SplitSquareHorizontal, Layers, Copy, FileText, FileCode2, Search } from "lucide-react";

export type ProductModule = {
  id: string;
  label: string;
  componentKey?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  valueProp: string;
  description: string;
  metaDescription: string;
  category: string;
  keywords: string[];
  icon: any;
  type: "utility" | "original";
  modules: ProductModule[];
  brand: {
    accentFrom: string;
    accentTo: string;
    favicon?: string;
    ogImage?: string;
  };
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  howItWorks?: { step: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  benefits?: string[];
  relatedProductSlugs?: string[];
};

export const products: Product[] = [
  {
    id: "1",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs in real-time.",
    metaDescription: "Count words, characters, sentences, paragraphs, and reading time instantly. Paste any text and get a full real-time breakdown. Free, fast, and 100% private.",
    category: "text",
    keywords: ["word","character","count","text","length","reading time"],
    icon: Type,
    slug: "word-counter",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "The ultimate text analysis companion.",
    valueProp: "Get a complete breakdown of your text's length, density, and readability in real-time directly in your browser.",
    seoTitle: "Free Word Counter — Count Words, Characters & Reading Time",
    seoDescription: "Instantly count words, characters, sentences, and paragraphs with Atomest's free Word Counter. Calculate reading time and speaking time in real-time. No sign-up required, 100% private.",
    benefits: [
      "Real-Time Statistics: Watch your word and character count update instantly as you type.",
      "Comprehensive Metrics: See your sentence count, paragraph count, and average word length.",
      "Reading & Speaking Time: Instantly calculate how long your text takes to read silently or read aloud.",
      "Privacy First: All processing happens locally in your browser. We never save or track your text."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Paste Your Text",
        "description": "Type or paste your essay, article, or document into the main text area."
      },
      {
        "step": "2",
        "title": "View Metrics",
        "description": "Instantly see the live count of words, characters (with and without spaces), sentences, and paragraphs."
      },
      {
        "step": "3",
        "title": "Analyze Readability",
        "description": "Check the estimated reading and speaking time to optimize your content's pacing."
      }
    ],
    faqs: [
      {
        "question": "Does this word counter save my text?",
        "answer": "No. All text analysis happens locally within your browser. Your data is completely private and never sent to our servers."
      },
      {
        "question": "Is there a limit to how many words I can count?",
        "answer": "There are no strict limits! You can paste extremely large documents (like full books) and get a count instantly, limited only by your browser's memory."
      },
      {
        "question": "Does it count spaces as characters?",
        "answer": "The tool provides two separate metrics: Character Count (including spaces) and Character Count (excluding spaces), so you have exact data for platforms like Twitter or SMS."
      },
      {
        "question": "How is reading time calculated?",
        "answer": "Reading time is estimated based on an average adult reading speed of 225 words per minute. Speaking time is calculated based on 130 words per minute."
      }
    ],
  },
  {
    id: "2",
    name: "Character Counter",
    description: "Count characters with or without spaces, lines, and words.",
    metaDescription: "Count characters with or without spaces, total lines, and words in any text. Perfect for Twitter, SMS, forms, and any character-limited input field.",
    category: "text",
    keywords: ["character","count","text","length","spaces"],
    icon: Braces,
    slug: "character-counter",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Perfect your text length for any platform.",
    valueProp: "Ensure your tweets, meta descriptions, and SMS messages perfectly fit platform constraints.",
    seoTitle: "Free Character Counter — Check Text Length Limits",
    seoDescription: "Easily check character limits for Twitter, SMS, SEO meta tags, and essays. Free online character counter with and without spaces. Fast, precise, and private.",
    benefits: [
      "Instant Feedback: See your character count update instantly with every keystroke.",
      "Whitespace Metrics: Differentiate between characters with spaces and without spaces.",
      "Social Media Ready: Perfect for checking X (Twitter) limits, Instagram bios, and SEO titles.",
      "100% Private: All counting happens client-side. We do not store your data."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Input Text",
        "description": "Type or paste your content into the text area."
      },
      {
        "step": "2",
        "title": "Check Length",
        "description": "Watch the character count update instantly, ensuring you stay within your target limit."
      },
      {
        "step": "3",
        "title": "Copy Result",
        "description": "Once perfected, click the copy button to take your perfectly-sized text anywhere."
      }
    ],
    faqs: [
      {
        "question": "Why do I need a character counter?",
        "answer": "Many platforms have strict limits (e.g., Twitter's 280 characters, SMS's 160 characters, or SEO titles at 60 characters). A character counter ensures your text isn't cut off."
      },
      {
        "question": "Does it count invisible characters?",
        "answer": "Yes, standard spaces, tabs, and line breaks are counted in the 'Characters (with spaces)' metric."
      },
      {
        "question": "Is my text uploaded to a server?",
        "answer": "No, all analysis is performed locally in your browser to guarantee your privacy."
      }
    ],
  },
  {
    id: "3",
    name: "Case Converter",
    description: "Convert text to UPPERCASE, lowercase, camelCase, PascalCase, and more.",
    metaDescription: "Convert text to uppercase, lowercase, camelCase, PascalCase, snake_case, and title case instantly. Free online text case converter with one-click copy.",
    category: "text",
    keywords: ["case","convert","uppercase","lowercase","camelcase","snakecase"],
    icon: ArrowDownUp,
    slug: "case-converter",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Transform your text casing instantly.",
    valueProp: "Quickly format messy text or code variables into any casing standard with one click.",
    seoTitle: "Free Case Converter — UPPERCASE, lowercase & Title Case",
    seoDescription: "Instantly convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. Free online text capitalization tool.",
    benefits: [
      "Multiple Formats: Convert to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.",
      "Developer Friendly: Easily format variable names for programming.",
      "One-Click Copy: Instantly copy your formatted text to the clipboard.",
      "No Data Stored: 100% browser-based processing for complete privacy."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Paste Text",
        "description": "Enter the text or variable names you want to reformat."
      },
      {
        "step": "2",
        "title": "Select Format",
        "description": "Click on your desired casing format (e.g., Title Case, snake_case)."
      },
      {
        "step": "3",
        "title": "Copy Output",
        "description": "The text instantly transforms. Click copy to use it."
      }
    ],
    faqs: [
      {
        "question": "What is Title Case?",
        "answer": "Title Case capitalizes the first letter of every major word, commonly used for book titles, headlines, and article names."
      },
      {
        "question": "Can this format code variables?",
        "answer": "Yes! It supports developer-specific casings like camelCase (myVariable), snake_case (my_variable), and kebab-case (my-variable)."
      },
      {
        "question": "Is there a limit to how much text I can convert?",
        "answer": "No, you can convert massive blocks of text instantly without any limits."
      }
    ],
  },
  {
    id: "4",
    name: "Text Repeater",
    description: "Repeat any text multiple times with custom separators.",
    metaDescription: "Repeat any text or phrase a custom number of times with any separator you choose. Useful for generating test data, fill patterns, and repetitive content.",
    category: "text",
    keywords: ["repeat","text","multiply","loop","generator"],
    icon: Copy,
    slug: "text-repeater",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Duplicate strings and text instantly.",
    valueProp: "Generate massive blocks of repeated text for testing, formatting, or fun without manual copying.",
    seoTitle: "Free Text Repeater — Duplicate Text Instantly",
    seoDescription: "Repeat any text, word, or string up to 10,000 times instantly. Add custom separators or new lines. Free online string duplicator tool.",
    benefits: [
      "Custom Separators: Separate repeated items with spaces, commas, new lines, or custom characters.",
      "High Volume: Repeat text thousands of times instantly without browser lag.",
      "Developer Testing: Perfect for generating dummy data or testing database limits.",
      "Zero Server Latency: Everything runs securely in your browser."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Enter Base Text",
        "description": "Type the word or phrase you want to duplicate."
      },
      {
        "step": "2",
        "title": "Set Parameters",
        "description": "Specify how many times to repeat it and what separator to use between repetitions."
      },
      {
        "step": "3",
        "title": "Generate",
        "description": "Instantly generate the repeated text block and copy it."
      }
    ],
    faqs: [
      {
        "question": "What is a text repeater used for?",
        "answer": "It is commonly used by developers to generate large strings of dummy text for database testing, layout stress-testing, or by users just having fun sending repeated messages."
      },
      {
        "question": "Can I put each repetition on a new line?",
        "answer": "Yes, simply select 'New Line' as your separator option to list the repeated text vertically."
      },
      {
        "question": "Will repeating a string 10,000 times crash my browser?",
        "answer": "Our tool is highly optimized and can handle massive repetition counts almost instantly without freezing your browser."
      }
    ],
  },
  {
    id: "5",
    name: "Text Reverser",
    description: "Reverse characters, words, or lines in any text.",
    metaDescription: "Reverse any text by characters, words, or lines in one click. Great for creating backwards text, fun messages, anagrams, or debugging string problems.",
    category: "text",
    keywords: ["reverse","flip","backwards","text","characters"],
    icon: ArrowDownUp,
    slug: "text-reverser",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Flip your text backward instantly.",
    valueProp: "Reverse letters or word orders in any block of text in real-time.",
    seoTitle: "Free Text Reverser — Reverse Words and Letters Online",
    seoDescription: "Reverse the characters or words in your text instantly. Free online backward text generator for puzzles, formatting, and fun.",
    benefits: [
      "Character Reversal: Flip the entire string backwards letter-by-letter.",
      "Word Reversal: Keep words intact but reverse their order in the sentence.",
      "Instant Processing: See the reversed text output live as you type.",
      "100% Private: Operates entirely locally; no text is sent to our servers."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Paste Text",
        "description": "Enter the text you want to manipulate."
      },
      {
        "step": "2",
        "title": "Choose Mode",
        "description": "Select whether you want to reverse the characters (txet) or reverse the words (words reverse)."
      },
      {
        "step": "3",
        "title": "Copy Result",
        "description": "Instantly copy the reversed output to your clipboard."
      }
    ],
    faqs: [
      {
        "question": "Why reverse text?",
        "answer": "Text reversal is often used for creating puzzles, encrypting simple messages, formatting bidirectional text, or just for fun on social media."
      },
      {
        "question": "Does it support emojis and special characters?",
        "answer": "Yes, the reverser correctly handles standard unicode characters and most emojis."
      },
      {
        "question": "Is the original formatting preserved?",
        "answer": "The text reverser will flip the characters exactly as inputted, meaning line breaks and spaces will also be reversed relative to the string."
      }
    ],
  },
  {
    id: "6",
    name: "Remove Duplicate Lines",
    description: "Easily clean up lists by removing duplicate lines from your text.",
    metaDescription: "Remove duplicate lines from any text or list instantly. Keeps only unique lines with options to sort and trim whitespace. Free online deduplication tool.",
    category: "text",
    keywords: ["duplicate","remove","clean","lines","unique","list"],
    icon: Layers,
    slug: "remove-duplicate-lines",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Clean and filter your lists instantly.",
    valueProp: "Remove redundant data from massive text lists and extract only unique entries.",
    seoTitle: "Remove Duplicate Lines — Free List Cleaner Tool",
    seoDescription: "Quickly remove duplicate lines from text files, lists, or code. Free online list cleaner to sort and filter unique entries instantly.",
    benefits: [
      "Instant Deduplication: Strip out duplicate entries from lists containing thousands of lines.",
      "Case Sensitivity Options: Choose whether 'Apple' and 'apple' should be treated as duplicates.",
      "Blank Line Removal: Automatically clean up empty spaces and empty lines.",
      "Browser Based: Process sensitive data securely without uploading files to a server."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Paste List",
        "description": "Paste your messy list of items, emails, or data into the input field."
      },
      {
        "step": "2",
        "title": "Filter",
        "description": "The tool instantly scans every line and removes any duplicate occurrences."
      },
      {
        "step": "3",
        "title": "Copy Unique List",
        "description": "Copy the pristine, deduplicated list back to your clipboard."
      }
    ],
    faqs: [
      {
        "question": "Can I remove duplicates from an email list?",
        "answer": "Yes! This tool is perfect for cleaning up mailing lists. Just paste the emails (one per line) and it will instantly remove the duplicates."
      },
      {
        "question": "Does it sort the lines automatically?",
        "answer": "By default, it maintains the original order of the first occurrence of each unique line. You can use our Sort Lines tool if you need them alphabetized."
      },
      {
        "question": "Is my data secure?",
        "answer": "Absolutely. Whether you are pasting customer emails or sensitive data, everything is processed locally in your browser."
      }
    ],
  },
  {
    id: "7",
    name: "Sort Lines",
    description: "Sort text lines alphabetically, by length, or randomize them.",
    metaDescription: "Sort text lines alphabetically ascending or descending, by length, or randomize their order. Instantly organize any list or block of text for free.",
    category: "text",
    keywords: ["sort","alphabetical","order","lines","randomize"],
    icon: AlignLeft,
    slug: "sort-lines",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Organize your data exactly how you need it.",
    valueProp: "Alphabetize or numerically sort massive lists with a single click.",
    seoTitle: "Sort Lines Alphabetically — Free Online List Sorter",
    seoDescription: "Sort text lines alphabetically (A-Z or Z-A), numerically, or by length. Free online list sorting tool. Fast, private, and easy to use.",
    benefits: [
      "Alphabetical Sorting: Sort from A-Z or Z-A instantly.",
      "Length Sorting: Organize lines from shortest to longest.",
      "Numerical Sorting: Accurately sort numbers rather than treating them as text.",
      "100% Private: Process sensitive lists without uploading them."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Paste List",
        "description": "Paste your list of words, names, or numbers."
      },
      {
        "step": "2",
        "title": "Select Sort Order",
        "description": "Choose Alphabetical, Reverse Alphabetical, or Length sorting."
      },
      {
        "step": "3",
        "title": "Copy",
        "description": "Grab your perfectly organized list."
      }
    ],
    faqs: [
      {
        "question": "Does it sort numbers correctly?",
        "answer": "Yes, unlike basic text sorters that put '10' before '2', our tool can properly handle numerical sorting logic."
      },
      {
        "question": "Can it ignore capitalization?",
        "answer": "Yes, our sorting algorithm is case-insensitive by default so 'apple' and 'Zebra' sort in the correct alphabetical order."
      },
      {
        "question": "Can I reverse the list?",
        "answer": "Yes, you can easily sort Z to A to invert your data."
      }
    ],
  },
  {
    id: "8",
    name: "Lorem Ipsum Generator",
    description: "Generate random placeholder text for your designs and layouts.",
    metaDescription: "Generate Lorem Ipsum placeholder text by words, sentences, or paragraphs. Perfect for UI mockups, wireframes, and design layouts. Copy with one click.",
    category: "text",
    keywords: ["lorem","ipsum","placeholder","text","generator","dummy"],
    icon: FileText,
    slug: "lorem-ipsum-generator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Generate perfect placeholder text.",
    valueProp: "Instantly create professional Lorem Ipsum placeholder text for websites, designs, and mockups.",
    seoTitle: "Free Lorem Ipsum Generator — Dummy Text Maker",
    seoDescription: "Generate beautiful Lorem Ipsum dummy text for your mockups and designs. Select paragraphs, words, or sentences. Free online placeholder text generator.",
    benefits: [
      "Customizable Length: Generate exact amounts of paragraphs, words, or sentences.",
      "Standard Latin: Uses the classic, professional pseudo-Latin text standard.",
      "HTML Support: Option to wrap paragraphs in <p> tags automatically.",
      "Instant Generation: No waiting, get your dummy text instantly."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Choose Format",
        "description": "Select if you want paragraphs, sentences, or a specific word count."
      },
      {
        "step": "2",
        "title": "Set Amount",
        "description": "Enter how many paragraphs or words you need for your mockup."
      },
      {
        "step": "3",
        "title": "Copy Text",
        "description": "Instantly copy the generated placeholder text directly to your clipboard."
      }
    ],
    faqs: [
      {
        "question": "What is Lorem Ipsum?",
        "answer": "Lorem Ipsum is standard dummy text used by printers and designers since the 1500s. It looks like standard English but has no meaning, preventing readers from being distracted by the content during design review."
      },
      {
        "question": "Can I generate HTML formatted text?",
        "answer": "Yes! You can toggle HTML output to automatically wrap your generated paragraphs in standard <p> tags, perfect for web development."
      },
      {
        "question": "Is the generated text random?",
        "answer": "Yes, the tool randomly constructs sentences using standard Latin dictionary words to ensure it looks natural."
      }
    ],
  },
  {
    id: "9",
    name: "Markdown Preview",
    description: "Write and preview Markdown with live HTML rendering.",
    metaDescription: "Write Markdown and see a live HTML preview side by side. Supports headings, bold, italic, lists, links, code blocks, tables, and all standard Markdown syntax.",
    category: "text",
    keywords: ["markdown","preview","editor","html","render","text"],
    icon: SplitSquareHorizontal,
    slug: "markdown-preview",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#8b5cf6"},
    tagline: "Write and render Markdown in real-time.",
    valueProp: "Write documentation and notes in Markdown and see the beautifully rendered HTML live.",
    seoTitle: "Free Markdown Previewer & Editor Online",
    seoDescription: "Write, edit, and preview Markdown in real-time. A free, fast online Markdown editor with syntax highlighting and instant HTML rendering.",
    benefits: [
      "Live Preview: See your Markdown rendered into HTML instantly as you type.",
      "GitHub Flavored: Supports tables, code blocks, and strikethroughs like GitHub.",
      "Syntax Highlighting: Code blocks are automatically colored for readability.",
      "Export Options: Easily copy the raw Markdown or the rendered HTML."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Write Markdown",
        "description": "Type standard Markdown syntax in the left editor panel."
      },
      {
        "step": "2",
        "title": "Live Rendering",
        "description": "Watch the right panel instantly render your headers, lists, and code blocks."
      },
      {
        "step": "3",
        "title": "Copy Output",
        "description": "Copy your markdown or export it to use in your documentation."
      }
    ],
    faqs: [
      {
        "question": "What is Markdown?",
        "answer": "Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. It's widely used for README files, forum posts, and documentation."
      },
      {
        "question": "Does this support tables and code blocks?",
        "answer": "Yes, this editor supports GitHub Flavored Markdown (GFM), meaning tables, fenced code blocks, and task lists work perfectly."
      },
      {
        "question": "Does it save my progress?",
        "answer": "Currently, the editor is stateless for privacy. Make sure to copy your work before closing the tab!"
      }
    ],
  },
  {
    id: "10",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON data instantly.",
    metaDescription: "Format, validate, and minify JSON data instantly in your browser. Highlights syntax errors and makes deeply nested JSON easy to read and debug.",
    category: "developer",
    keywords: ["json","format","validate","minify","beautify","developer"],
    icon: FileJson,
    slug: "json-formatter",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#10b981","accentTo":"#06b6d4"},
    tagline: "Beautify and validate your JSON instantly.",
    valueProp: "Turn minified or messy JSON data into highly readable, perfectly indented code.",
    seoTitle: "Free JSON Formatter & Validator Online",
    seoDescription: "Format, beautify, and validate JSON data instantly. Free online JSON formatter tool for developers. Fix messy JSON arrays and objects.",
    benefits: [
      "Instant Beautification: Auto-format messy JSON into a clean, readable structure.",
      "Syntax Validation: Instantly detect and highlight syntax errors or missing commas.",
      "Minification: Compress formatted JSON back into a single line to save space.",
      "Local Processing: Process massive, sensitive JSON API payloads securely in your browser."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Paste JSON",
        "description": "Paste your minified or messy JSON string into the input editor."
      },
      {
        "step": "2",
        "title": "Format or Minify",
        "description": "Click Format to beautify the code, or Minify to compress it."
      },
      {
        "step": "3",
        "title": "Copy Result",
        "description": "Copy the pristine, valid JSON back to your clipboard."
      }
    ],
    faqs: [
      {
        "question": "Will this tool catch JSON errors?",
        "answer": "Yes, if your JSON is invalid (e.g., missing quotes or trailing commas), the formatter will fail and output an error, serving as a reliable validator."
      },
      {
        "question": "Can I minify JSON here?",
        "answer": "Yes! You can use this tool to strip all whitespace and line breaks from your JSON to reduce file size."
      },
      {
        "question": "Is it safe to paste sensitive API keys in the JSON?",
        "answer": "Absolutely. The JSON parsing and formatting happens 100% locally in your browser using JavaScript. No data is ever transmitted to our servers."
      }
    ],
  },
  {
    id: "11",
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 back to text.",
    metaDescription: "Encode plain text to Base64 or decode Base64 strings back to readable text in one click. Runs entirely in your browser — no data is sent to any server.",
    category: "developer",
    keywords: ["base64","encode","decode","convert","developer"],
    icon: FileCode2,
    slug: "base64",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#10b981","accentTo":"#06b6d4"},
    tagline: "Encode and decode Base64 strings instantly.",
    valueProp: "Securely translate binary data or text into Base64 format for safe data transfer and API requests.",
    seoTitle: "Free Base64 Encoder/Decoder Online",
    seoDescription: "Instantly encode text to Base64 or decode Base64 back to text. Free online developer tool. Secure, fast, and 100% private.",
    benefits: [
      "Bidirectional: Easily swap between encoding plain text to Base64 and decoding Base64 back to plain text.",
      "Developer Ready: Perfect for embedding images in CSS, generating Authorization headers, or securing URLs.",
      "Instant Conversion: See the encoded or decoded string in real-time as you type.",
      "Completely Secure: All Base64 processing happens locally; your strings are never sent to a server."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Enter String",
        "description": "Paste the plain text or Base64 string you want to convert."
      },
      {
        "step": "2",
        "title": "Select Action",
        "description": "Choose whether you want to Encode (Text to Base64) or Decode (Base64 to Text)."
      },
      {
        "step": "3",
        "title": "Copy Result",
        "description": "Instantly copy the converted string to use in your code."
      }
    ],
    faqs: [
      {
        "question": "What is Base64 encoding used for?",
        "answer": "Base64 is used to encode binary data (like images or files) into ASCII text format so it can be safely transmitted over networks, embedded in HTML/CSS, or used in basic API authentication headers."
      },
      {
        "question": "Is Base64 a form of encryption?",
        "answer": "No, Base64 is not encryption. It is an encoding scheme. Anyone can easily decode a Base64 string. Do not use it to secure passwords or sensitive data."
      },
      {
        "question": "Are there character limits for encoding?",
        "answer": "No, our tool handles massive strings efficiently in the browser without arbitrary length limits."
      }
    ],
  },
  {
    id: "12",
    name: "URL Encoder/Decoder",
    description: "Safely encode or decode URLs and URI components.",
    metaDescription: "Encode or decode URLs and URI components instantly. Converts special characters for safe use in links, query strings, and API requests. Free and private.",
    category: "developer",
    keywords: ["url","encode","decode","uri","web","link"],
    icon: LinkIcon,
    slug: "url-encoder",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#10b981","accentTo":"#06b6d4"},
    tagline: "Safely format strings for web URLs.",
    valueProp: "Ensure your query parameters and links are safely escaped and properly formatted for HTTP transmission.",
    seoTitle: "Free URL Encoder & Decoder Online",
    seoDescription: "Instantly URL-encode or decode strings for safe web transmission. Free online developer tool to escape special characters in URLs securely.",
    benefits: [
      "Encode & Decode: Instantly escape special characters to make them URL-safe, or decode them back to readable text.",
      "Standard Compliance: Strictly follows RFC 3986 encoding standards used by modern web browsers.",
      "Instant Processing: Real-time translation as you type your query strings.",
      "Privacy First: Operates 100% locally. No URLs or API keys are ever sent to a server."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Input String",
        "description": "Paste the URL, query parameter, or text string into the editor."
      },
      {
        "step": "2",
        "title": "Choose Mode",
        "description": "Click Encode to escape special characters, or Decode to revert encoded characters like '%20' back to spaces."
      },
      {
        "step": "3",
        "title": "Copy Result",
        "description": "Copy the safe string for your web application."
      }
    ],
    faqs: [
      {
        "question": "Why do I need to encode URLs?",
        "answer": "URLs can only be sent over the internet using the ASCII character set. If a URL contains special characters (like spaces, ampersands, or emojis), they must be converted into a valid ASCII format (like '%20' for a space) to prevent breaking the link."
      },
      {
        "question": "What is the difference between URI and URL encoding?",
        "answer": "URL is a specific type of URI. This tool uses JavaScript's encodeURIComponent(), which safely encodes almost all characters, making it perfect for query string parameters."
      },
      {
        "question": "Is my data logged?",
        "answer": "No. The decoding happens directly in your browser. Sensitive tokens in URLs remain completely private."
      }
    ],
  },
  {
    id: "13",
    name: "UUID Generator",
    description: "Generate secure, random UUIDs (version 4) instantly.",
    metaDescription: "Generate cryptographically random UUID v4 identifiers instantly. Copy single or bulk UUIDs for use in databases, APIs, and software development projects.",
    category: "developer",
    keywords: ["uuid","guid","generator","random","unique","id"],
    icon: Fingerprint,
    slug: "uuid-generator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#10b981","accentTo":"#06b6d4"},
    tagline: "Generate cryptographically secure unique identifiers.",
    valueProp: "Create collision-free UUIDs for your database records, API keys, and software architectures instantly.",
    seoTitle: "Free UUID/GUID Generator — Create v4 UUIDs",
    seoDescription: "Generate random, unique UUIDs (v4) instantly. Free online GUID generator for databases, APIs, and developers. Bulk generation supported.",
    benefits: [
      "Version 4 UUIDs: Generates standard random UUIDs relying on cryptographically secure random number generators.",
      "Bulk Generation: Need 100 UUIDs for a database seed? Generate massive lists instantly.",
      "Zero Collisions: The mathematical chance of generating a duplicate UUID is virtually zero.",
      "Local Generation: UUIDs are generated in your browser, ensuring no one else has ever seen or logged them."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Set Quantity",
        "description": "Choose how many unique UUIDs you want to generate (e.g., 1 or 100)."
      },
      {
        "step": "2",
        "title": "Generate",
        "description": "Click the generate button to instantly create fresh UUIDs."
      },
      {
        "step": "3",
        "title": "Copy",
        "description": "Copy a single UUID or the entire bulk list to your clipboard."
      }
    ],
    faqs: [
      {
        "question": "What is a UUID?",
        "answer": "UUID stands for Universally Unique Identifier (also known as a GUID). It is a 128-bit label used for information in computer systems. Because they are so large, you can generate them independently without a central database and guarantee they will be unique."
      },
      {
        "question": "Which version of UUID does this tool generate?",
        "answer": "This tool generates Version 4 UUIDs, which are created using random (or pseudo-random) numbers. This is the most common standard used in modern web development."
      },
      {
        "question": "Are these UUIDs truly random?",
        "answer": "Yes, we utilize the browser's native Crypto API (`crypto.randomUUID()`) to generate cryptographically secure identifiers."
      }
    ],
  },
  {
    id: "14",
    name: "Regex Tester",
    description: "Test and debug regular expressions with live highlighting.",
    metaDescription: "Test and debug regular expressions with live match highlighting. Supports global, multiline, and case-insensitive flags. Free online regex tester and validator.",
    category: "developer",
    keywords: ["regex","regular expression","test","match","developer"],
    icon: Hash,
    slug: "regex-tester",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#10b981","accentTo":"#06b6d4"},
    tagline: "Debug Regular Expressions in real-time.",
    valueProp: "Test your Regex patterns against sample text with live syntax highlighting and instant match extraction.",
    seoTitle: "Free RegEx Tester & Regex Matcher Online",
    seoDescription: "Test, debug, and write Regular Expressions instantly. Free online RegEx tester with live highlighting and match extraction.",
    benefits: [
      "Live Highlighting: See your regex matches highlighted directly inside your sample text as you type.",
      "Flag Support: Easily toggle global (g), case-insensitive (i), and multiline (m) flags.",
      "Match Extraction: View an organized list of all exact matches extracted from your text.",
      "Browser Native: Runs completely in-browser, ensuring sensitive sample data (like logs or emails) is never uploaded."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Write Regex",
        "description": "Type your Regular Expression pattern into the top input field."
      },
      {
        "step": "2",
        "title": "Input Test Data",
        "description": "Paste the text you want to search through into the main editor."
      },
      {
        "step": "3",
        "title": "View Matches",
        "description": "Watch the tool highlight all matches live and list them below."
      }
    ],
    faqs: [
      {
        "question": "Which Regex flavor does this tool use?",
        "answer": "This tool uses the JavaScript (ECMAScript) Regular Expression engine since it runs natively in your browser."
      },
      {
        "question": "How do I make my search case-insensitive?",
        "answer": "Simply type 'i' into the Flags input box next to your Regex pattern to ignore casing."
      },
      {
        "question": "Is it safe to paste private server logs here?",
        "answer": "Yes. The regex evaluation happens entirely locally on your machine. Your server logs never leave your device."
      }
    ],
  },
  {
    id: "15",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates and vice versa.",
    metaDescription: "Convert Unix timestamps to human-readable dates and times, or any date back to a Unix epoch value. Supports both seconds and millisecond timestamps.",
    category: "developer",
    keywords: ["timestamp","unix","epoch","time","date","converter"],
    icon: CalendarClock,
    slug: "timestamp-converter",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#10b981","accentTo":"#06b6d4"},
    tagline: "Translate Unix epochs into human dates.",
    valueProp: "Instantly convert confusing Unix timestamps into readable local times, or generate current epochs for your code.",
    seoTitle: "Free Unix Timestamp Epoch Converter",
    seoDescription: "Convert Unix Epoch timestamps to human-readable dates, or convert dates back to Unix timestamps. Free online developer tool.",
    benefits: [
      "Two-Way Conversion: Turn a 10-digit epoch into a readable date, or a calendar date into an epoch.",
      "Milliseconds Support: Supports both standard seconds (Unix) and milliseconds (JavaScript) timestamps.",
      "Local Timezones: Automatically detects and displays the result in your computer's local timezone.",
      "Live Epoch: View and copy the current Unix timestamp instantly upon page load."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Input Data",
        "description": "Enter a numerical Unix timestamp or a readable date string."
      },
      {
        "step": "2",
        "title": "Convert",
        "description": "The tool instantly parses the input and determines whether to encode or decode."
      },
      {
        "step": "3",
        "title": "View Date",
        "description": "View the exact UTC date, Local date, and Relative time (e.g., '2 months ago')."
      }
    ],
    faqs: [
      {
        "question": "What is a Unix Timestamp?",
        "answer": "A Unix timestamp (or Epoch time) is a way to track time as a running total of seconds. It represents the number of seconds that have elapsed since January 1, 1970 at midnight UTC."
      },
      {
        "question": "Why is my year showing up as 50,000+?",
        "answer": "You likely entered a timestamp in milliseconds (which JavaScript uses) instead of seconds. The tool should automatically handle standard lengths, but verify your input."
      },
      {
        "question": "Does it account for leap seconds?",
        "answer": "No, standard Unix time does not count leap seconds."
      }
    ],
  },
  {
    id: "16",
    name: "Password Generator",
    description: "Create secure, random passwords with custom parameters.",
    metaDescription: "Generate strong, random passwords with custom length, uppercase, lowercase, numbers, and symbols. Secure password creation that runs entirely in your browser.",
    category: "generators",
    keywords: ["password","secure","generator","random","security"],
    icon: Shield,
    slug: "password-generator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#f59e0b","accentTo":"#ef4444"},
    tagline: "Generate uncrackable passwords instantly.",
    valueProp: "Create cryptographically secure, highly complex passwords tailored to any specific length or character requirement.",
    seoTitle: "Free Secure Password Generator Online",
    seoDescription: "Generate highly secure, random passwords instantly. Customize length and characters. Free online password maker. 100% private.",
    benefits: [
      "Custom Complexity: Choose exactly what to include (uppercase, lowercase, numbers, symbols).",
      "Cryptographically Secure: Uses the browser's native Crypto API to guarantee true randomness.",
      "No Cloud Storage: Passwords are generated completely offline in your browser memory.",
      "Instant Copy: One click to generate and copy a fresh password securely."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Set Length",
        "description": "Use the slider to choose a password length between 8 and 64 characters."
      },
      {
        "step": "2",
        "title": "Select Rules",
        "description": "Toggle switches for numbers, symbols, and casing based on the website's requirements."
      },
      {
        "step": "3",
        "title": "Copy",
        "description": "Click the copy button. The password is never saved or transmitted."
      }
    ],
    faqs: [
      {
        "question": "Are these passwords safe to use for banking?",
        "answer": "Yes. They are generated using your device's cryptographically secure pseudo-random number generator (CSPRNG), making them impossible to predict."
      },
      {
        "question": "Does Atomest save the passwords I generate?",
        "answer": "Absolutely not. The generator runs entirely in your browser using JavaScript. Once you refresh the page, the password is gone forever from memory."
      },
      {
        "question": "What makes a strong password?",
        "answer": "Length is the most critical factor. A 16-character password with just letters is generally much harder to crack than an 8-character password with complex symbols."
      }
    ],
  },
  {
    id: "17",
    name: "QR Code Generator",
    description: "Create high-quality, scannable QR codes instantly for URLs, text, and data.",
    metaDescription: "Create scannable QR codes for URLs, text, contact info, and more. Download as high-resolution PNG instantly. The fastest free online QR code maker with absolutely no sign-up required.",
    seoTitle: "Free QR Code Generator — Create Custom QR Codes Instantly",
    seoDescription: "Need a fast, reliable QR code? Atomest's Free QR Code Generator lets you convert URLs, plain text, and custom data into high-resolution, perfectly scannable QR codes in milliseconds. Completely free, no watermarks, and no sign-up required. Generate and download as a PNG image directly from your browser.",
    category: "generators",
    keywords: ["qr code generator", "free qr code maker", "create qr code online", "qr code for url", "scan barcode", "custom qr code"],
    icon: QrCode,
    slug: "qr-code-generator",
    tagline: "Bridge the physical and digital worlds instantly.",
    valueProp: "Generate high-resolution QR codes that scan flawlessly on any device, directly in your browser.",
    type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#f59e0b","accentTo":"#ef4444"},
    benefits: [
      "100% Free & No Sign-up: Generate unlimited QR codes without creating an account or paying subscription fees.",
      "Instant Processing: Type your text or URL and watch the QR code render in real-time, zero server delays.",
      "High-Resolution Export: Download crisp, high-quality PNG images that scale perfectly for print or digital screens.",
      "Privacy First: All QR code generation happens directly in your browser. We never store or track the data you encode.",
      "Universal Compatibility: Codes generated strictly adhere to global QR standards, ensuring they scan flawlessly on iOS, Android, and dedicated hardware scanners."
    ],
    howItWorks: [
      {
        step: "1",
        title: "Enter Your Data",
        description: "Simply paste a website URL, type a text message, or input any data you want to share into the input field."
      },
      {
        step: "2",
        title: "Real-time Generation",
        description: "As you type, the underlying algorithm instantly converts your data into a highly-optimized, scannable QR matrix."
      },
      {
        step: "3",
        title: "Download & Share",
        description: "Click the download button to instantly save a high-resolution PNG of your custom QR code, ready to be printed or shared."
      }
    ],
    faqs: [
      {
        question: "Do the QR codes generated here expire?",
        answer: "No! The QR codes generated by Atomest are completely static. This means they are hard-coded with your exact data and will last forever. They will never expire, and there are no scanning limits."
      },
      {
        question: "Is this QR Code Generator truly free?",
        answer: "Yes, it is 100% free. Unlike many other tools that sneak in watermarks or force you to upgrade to a premium plan to keep your code active, Atomest offers unlimited, watermark-free generation for everyone."
      },
      {
        question: "What kind of data can I put in a QR code?",
        answer: "You can encode almost any text-based data! The most common use cases are website URLs (links), plain text messages, email addresses, phone numbers, and WiFi network credentials."
      },
      {
        question: "Is my data secure when generating a code?",
        answer: "Absolutely. Atomest is designed with a privacy-first architecture. The entire QR code generation process happens locally inside your browser. Your data is never sent to our servers, meaning it remains completely private."
      },
      {
        question: "Can I use these QR codes for commercial print?",
        answer: "Yes. When you download your QR code, it is exported as a crisp, high-resolution PNG image. This makes it perfect for commercial printing on flyers, business cards, restaurant menus, and product packaging."
      }
    ]
  },
  {
    id: "18",
    name: "Random Number Generator",
    description: "Generate random numbers within a specific range.",
    metaDescription: "Generate one or multiple random numbers within any custom range. Set your min and max values for tailored results. Free online RNG for games and decisions.",
    category: "generators",
    keywords: ["random","number","generator","rng","chance"],
    icon: Shuffle,
    slug: "random-number",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#f59e0b","accentTo":"#ef4444"},
    tagline: "The ultimate Random Number Generator.",
    valueProp: "Quickly generate unbiased random numbers within a specific range for raffles, games, or statistical testing.",
    seoTitle: "Free Random Number Generator — Pick Custom Ranges",
    seoDescription: "Generate truly random numbers within any custom range. Set your min and max values. Free online RNG tool for games, raffles, and decisions.",
    benefits: [
      "Custom Ranges: Set any minimum and maximum value, including negative numbers.",
      "Truly Random: Utilizes secure Math algorithms to ensure unbiased probability.",
      "Instant Generation: Click a button and get an instant result.",
      "Private: No server tracking, completely safe for secure draws."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Set Range",
        "description": "Input your minimum value (e.g., 1) and your maximum value (e.g., 100)."
      },
      {
        "step": "2",
        "title": "Generate",
        "description": "Click the button to roll a new random number instantly."
      },
      {
        "step": "3",
        "title": "Repeat",
        "description": "Keep clicking to generate as many numbers as you need."
      }
    ],
    faqs: [
      {
        "question": "Is this generator truly unbiased?",
        "answer": "Yes, it uses native browser PRNG (Pseudo-Random Number Generator) which provides statistically uniform distribution for everyday use."
      },
      {
        "question": "Can I use negative numbers?",
        "answer": "Yes, you can set the minimum to -100 and the maximum to 100, and it will properly pick a number between them."
      },
      {
        "question": "Is this safe for running a contest or raffle?",
        "answer": "Yes, it is perfectly suited for picking a random winner from a list of numbers."
      }
    ],
  },
  {
    id: "19",
    name: "Coin Flip",
    description: "Simulate flipping a coin for heads or tails.",
    metaDescription: "Flip a virtual coin and get instant heads or tails results. Track your flip history and statistics in real time. Great for decisions and probability demos.",
    category: "generators",
    keywords: ["coin","flip","heads","tails","random","chance"],
    icon: Coins,
    slug: "coin-flip",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#f59e0b","accentTo":"#ef4444"},
    tagline: "Settle disputes with a virtual coin toss.",
    valueProp: "Can't make a decision? Instantly flip a truly random virtual coin for an unbiased Heads or Tails result.",
    seoTitle: "Flip a Coin Online — Free Virtual Coin Toss",
    seoDescription: "Need to make a decision? Flip a virtual coin instantly. Heads or tails. Free online coin flipper with unbiased probability.",
    benefits: [
      "50/50 Probability: Guaranteed unbiased 50% chance for Heads or Tails.",
      "Instant Results: No long animations, get your answer immediately.",
      "Track History: Keeps a running tally of how many times Heads or Tails has landed.",
      "Always Free: Flip as many times as you want without limits."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Think of a Question",
        "description": "Assign Heads to one outcome, and Tails to another."
      },
      {
        "step": "2",
        "title": "Click Flip",
        "description": "Hit the flip button to execute the randomizer."
      },
      {
        "step": "3",
        "title": "Get the Result",
        "description": "The result is displayed instantly alongside your total flip statistics."
      }
    ],
    faqs: [
      {
        "question": "Is the coin toss truly 50/50?",
        "answer": "Yes, the algorithm relies on a strict 50% mathematical split using a pseudo-random number generator, making it completely fair."
      },
      {
        "question": "Why use a virtual coin instead of a real one?",
        "answer": "A virtual coin guarantees zero physical bias (like weight distribution on a real coin) and is perfect when you don't have change in your pocket."
      },
      {
        "question": "Does it track my history across days?",
        "answer": "Currently, the tally resets when you refresh the page to maintain absolute privacy."
      }
    ],
  },
  {
    id: "20",
    name: "Dice Roller",
    description: "Roll virtual dice for tabletop games and probability.",
    metaDescription: "Roll one or more virtual dice including D4, D6, D8, D10, D12, and D20 sides. Perfect for tabletop RPGs, board games, and random number decisions.",
    category: "generators",
    keywords: ["dice","roll","d20","dnd","random","generator"],
    icon: Dices,
    slug: "dice-roller",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#f59e0b","accentTo":"#ef4444"},
    tagline: "Roll virtual dice for any game or decision.",
    valueProp: "Don't have physical dice? Instantly roll up to 6 virtual dice with perfect mathematical fairness.",
    seoTitle: "Free Online Dice Roller — Roll D6 Virtual Dice",
    seoDescription: "Roll virtual dice instantly for board games, D&D, or random decisions. Free online 3D dice roller. Roll multiple dice at once.",
    benefits: [
      "Multiple Dice: Roll between 1 and 6 standard 6-sided dice simultaneously.",
      "Automatic Totals: The tool automatically calculates the sum of all your rolled dice.",
      "Perfect Fairness: Uses mathematical RNG to guarantee every face has a 1-in-6 chance.",
      "Instant UI: Beautiful, fast interface with no annoying delays."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Select Quantity",
        "description": "Choose how many dice you want to roll at the same time."
      },
      {
        "step": "2",
        "title": "Roll",
        "description": "Click the roll button to randomize all selected dice."
      },
      {
        "step": "3",
        "title": "Read Total",
        "description": "View the individual dice faces and the combined total sum instantly."
      }
    ],
    faqs: [
      {
        "question": "What kind of dice does this roll?",
        "answer": "This tool rolls standard D6 (six-sided) dice, which are used in Monopoly, Yahtzee, and most standard board games."
      },
      {
        "question": "Can I roll more than 2 dice?",
        "answer": "Yes! You can roll anywhere from a single die up to 6 dice simultaneously."
      },
      {
        "question": "Is the roller completely fair?",
        "answer": "Yes, unlike cheap physical dice which can have weight imbalances, this virtual roller is perfectly mathematically fair."
      }
    ],
  },
  {
    id: "21",
    name: "Image Compressor",
    description: "Compress images directly in your browser without quality loss.",
    metaDescription: "Compress JPEG, PNG, and WebP images directly in your browser with no upload needed. Reduce file size while maintaining visual quality. Free and private.",
    category: "image",
    keywords: ["image","compress","optimize","reduce","size","photo"],
    icon: Minimize,
    slug: "image-compressor",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#f43f5e","accentTo":"#fb923c"},
    tagline: "Shrink image file sizes without losing quality.",
    valueProp: "Dramatically reduce the file size of your photos and graphics directly in your browser, ensuring faster website load times and less storage use.",
    seoTitle: "Free Online Image Compressor — Reduce Size without Quality Loss",
    seoDescription: "Compress JPEG, PNG, and WebP images instantly in your browser. Reduce file size by up to 80% without losing quality. 100% private.",
    benefits: [
      "Browser-Native Processing: Images are compressed locally using HTML5 canvas. They are NEVER uploaded to a server.",
      "Custom Quality Slider: You control the exact balance between file size and visual quality.",
      "Format Conversion: Automatically converts heavy PNGs into highly optimized WebP or JPEG formats.",
      "Massive Reductions: Compress massive 5MB photos down to under 500KB with negligible visual loss."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Upload Image",
        "description": "Drag and drop or select any heavy JPEG, PNG, or WebP file from your computer."
      },
      {
        "step": "2",
        "title": "Adjust Quality",
        "description": "Use the slider to lower the quality percentage until you hit your target file size."
      },
      {
        "step": "3",
        "title": "Download",
        "description": "Instantly download the newly compressed image to your device."
      }
    ],
    faqs: [
      {
        "question": "Is my image uploaded to your servers?",
        "answer": "NO! This is the most important feature of Atomest's image tools. The compression happens entirely in your browser using local processing. Your private photos are 100% secure."
      },
      {
        "question": "Why should I compress my images?",
        "answer": "Large images cause websites to load slowly, which hurts SEO and frustrates users. Compressing images saves bandwidth and dramatically speeds up load times."
      },
      {
        "question": "Does this work on mobile?",
        "answer": "Yes, you can select images directly from your phone's camera roll and compress them before sending them over email or text."
      },
      {
        "question": "Will my image look blurry?",
        "answer": "If you keep the quality slider above 70%, the human eye can rarely tell the difference, but the file size will be drastically reduced."
      }
    ],
  },
  {
    id: "22",
    name: "Image Converter",
    description: "Convert images between PNG, JPEG, and WebP formats.",
    metaDescription: "Convert images between PNG, JPEG, and WebP formats instantly in your browser. No upload, no account needed — fully private client-side image conversion.",
    category: "image",
    keywords: ["image","convert","format","png","jpeg","webp"],
    icon: FileImage,
    slug: "image-converter",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#f43f5e","accentTo":"#fb923c"},
    tagline: "Convert image formats directly in your browser.",
    valueProp: "Transform incompatible image types into universally accepted formats without uploading sensitive files to external servers.",
    seoTitle: "Free Image Converter — Convert PNG, JPEG, WebP Online",
    seoDescription: "Instantly convert images between PNG, JPEG, and WebP formats. Free online image converter running completely in your browser. No uploads, fast & secure.",
    benefits: [
      "No Uploads: File processing happens entirely locally in your browser memory for maximum privacy.",
      "Universal Formats: Convert between JPEG (best for photos), PNG (best for transparency), and WebP (best for web).",
      "Instant Processing: Because there is no server upload wait time, conversions happen in milliseconds.",
      "Completely Free: No watermarks, no registration, and no file limits."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Load Image",
        "description": "Drag and drop any image file into the converter zone."
      },
      {
        "step": "2",
        "title": "Select Format",
        "description": "Choose your desired output format from the dropdown menu (e.g., WebP)."
      },
      {
        "step": "3",
        "title": "Download",
        "description": "Click download and instantly save the newly formatted image."
      }
    ],
    faqs: [
      {
        "question": "Why should I convert to WebP?",
        "answer": "WebP is a modern image format developed by Google. It provides superior lossless and lossy compression, making images drastically smaller (and faster to load) than PNG or JPEG."
      },
      {
        "question": "Are my images uploaded to the cloud?",
        "answer": "No. Unlike other converters, this tool uses the HTML5 Canvas API to redraw and convert your image entirely locally on your device."
      },
      {
        "question": "Will converting to JPEG remove transparency?",
        "answer": "Yes. The JPEG format does not support transparency (alpha channels). If you convert a transparent PNG to JPEG, the transparent areas will automatically become white."
      }
    ],
  },
  {
    id: "23",
    name: "Color Picker",
    description: "Extract colors, convert formats, and find the perfect shade.",
    metaDescription: "Pick, explore, and convert colors between HEX, RGB, and HSL formats. Browse color palettes and find the perfect shade for your designs and projects.",
    category: "color",
    keywords: ["color","picker","hex","rgb","hsl","design"],
    icon: Palette,
    slug: "color-picker",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#ec4899","accentTo":"#f43f5e"},
    tagline: "Find the perfect shade for your project.",
    valueProp: "Visually explore the color spectrum and instantly generate perfectly formatted code values for your CSS.",
    seoTitle: "Free Online Color Picker — Extract Hex, RGB, HSL",
    seoDescription: "Pick colors visually and get their Hex, RGB, and HSL codes instantly. Free online color picker tool for web developers and designers.",
    benefits: [
      "Multiple Formats: Instantly outputs Hex, RGB, and HSL formats simultaneously.",
      "Visual Canvas: Browse gradients visually to find the exact shade you need.",
      "One-Click Copy: Click any format to copy it directly to your clipboard.",
      "Real-Time Syncing: Adjust the sliders and watch the codes update instantly without lag."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Select Hue",
        "description": "Use the main slider to find your base color hue."
      },
      {
        "step": "2",
        "title": "Adjust Shade",
        "description": "Click around the canvas to adjust the exact lightness and saturation."
      },
      {
        "step": "3",
        "title": "Copy Code",
        "description": "Click the Hex, RGB, or HSL button to copy the code for your CSS."
      }
    ],
    faqs: [
      {
        "question": "What is the difference between HEX and RGB?",
        "answer": "HEX is a base-16 format commonly used in HTML/CSS (e.g., #FFFFFF). RGB represents Red, Green, and Blue light values (e.g., rgb(255, 255, 255)). They represent the exact same color."
      },
      {
        "question": "What is HSL used for?",
        "answer": "HSL (Hue, Saturation, Lightness) is preferred by modern designers because it is much easier for humans to intuitively adjust. Making a color darker just requires lowering the Lightness percentage."
      }
    ],
  },
  {
    id: "24",
    name: "HEX to RGB Converter",
    description: "Quickly convert color values between HEX, RGB, and HSL.",
    metaDescription: "Instantly convert color values between HEX, RGB, and HSL formats. Enter any color code and get all three representations at once. Free and fast.",
    category: "color",
    keywords: ["color","converter","hex","rgb","hsl","translate"],
    icon: Droplet,
    slug: "hex-rgb-converter",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#ec4899","accentTo":"#f43f5e"},
    tagline: "Translate colors between CSS formats.",
    valueProp: "Seamlessly translate color definitions between HEX and RGB to maintain consistency across your stylesheets and design systems.",
    seoTitle: "Free HEX to RGB Converter — Color Code Translator",
    seoDescription: "Instantly convert HEX color codes to RGB or RGB to HEX. Free online tool for web developers. Supports shorthand HEX and transparency.",
    benefits: [
      "Bidirectional: Convert HEX to RGB, or type RGB and get the HEX.",
      "Live Preview: Immediately see a visual swatch of the color you are converting.",
      "Error Handling: Instantly alerts you if you type an invalid CSS color code.",
      "No Ads: Clean, minimal interface focused purely on developer speed."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Input Color",
        "description": "Type a HEX code (like #FF5733) or an RGB string (like 255, 87, 51)."
      },
      {
        "step": "2",
        "title": "Preview",
        "description": "Look at the color swatch to confirm it matches your expectation."
      },
      {
        "step": "3",
        "title": "Copy Result",
        "description": "Copy the automatically translated value on the other side."
      }
    ],
    faqs: [
      {
        "question": "Does this support 3-digit shorthand HEX?",
        "answer": "Yes! You can input a shorthand code like #FFF and the tool will automatically understand it as #FFFFFF."
      },
      {
        "question": "Why use RGB over HEX?",
        "answer": "RGB is often preferred when you need to add transparency (alpha) to a color in CSS using rgba(), though modern browsers now support 8-digit HEX codes for transparency as well."
      }
    ],
  },
  {
    id: "25",
    name: "Gradient Generator",
    description: "Create beautiful CSS gradients and copy the code instantly.",
    metaDescription: "Create beautiful linear and radial CSS gradients with a visual editor. Copy the ready-to-use CSS code instantly for your web design projects.",
    category: "color",
    keywords: ["gradient","color","css","generator","design","background"],
    icon: Brush,
    slug: "gradient-generator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#ec4899","accentTo":"#f43f5e"},
    tagline: "Design beautiful CSS gradients visually.",
    valueProp: "Stop guessing CSS angles. Visually blend colors into stunning gradients and copy the exact CSS background code instantly.",
    seoTitle: "Free CSS Gradient Generator — Beautiful UI Backgrounds",
    seoDescription: "Create stunning CSS linear and radial gradients instantly. Generate the perfect CSS background code. Free online gradient maker for web designers.",
    benefits: [
      "Visual Builder: See exactly what the gradient looks like before writing any code.",
      "Linear & Radial: Support for both standard linear directions and circular radial gradients.",
      "Angle Control: Easily spin the dial to adjust the precise degree of a linear gradient.",
      "Instant CSS: Generates cross-browser compatible CSS code ready to paste."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Pick Colors",
        "description": "Select the starting color and the ending color."
      },
      {
        "step": "2",
        "title": "Set Direction",
        "description": "Choose the angle or toggle between Linear and Radial types."
      },
      {
        "step": "3",
        "title": "Copy CSS",
        "description": "Copy the generated `background: linear-gradient(...)` CSS rule directly."
      }
    ],
    faqs: [
      {
        "question": "What is a CSS gradient?",
        "answer": "A CSS gradient allows you to display smooth transitions between two or more specified colors, saving you from having to use heavy background images."
      },
      {
        "question": "Do CSS gradients work on all browsers?",
        "answer": "Yes, modern linear-gradient and radial-gradient rules are supported by 99% of all modern browsers, making them incredibly safe for production."
      }
    ],
  },
  {
    id: "26",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, and days.",
    metaDescription: "Calculate your exact age in years, months, and days from your date of birth. Also find out how many days remain until your next birthday.",
    category: "calculators",
    keywords: ["age","calculator","birthday","date","time","years"],
    icon: CalendarClock,
    slug: "age-calculator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#3b82f6"},
    tagline: "Find out exactly how old you are.",
    valueProp: "Calculate the precise duration between your birth date and today down to the exact day.",
    seoTitle: "Free Age Calculator — Calculate Exact Age in Days",
    seoDescription: "Calculate your exact age in years, months, and days. Free online age calculator based on date of birth. Find out exactly how old you are today.",
    benefits: [
      "High Precision: Shows age in years, months, and remaining days.",
      "Future/Past Dates: Calculate age on a specific date in the future or past, not just today.",
      "Instant Math: No loading screens, get the calculation instantly.",
      "Private: Birthdates are not saved or sent to any server."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Select Birth Date",
        "description": "Use the calendar picker to select your exact date of birth."
      },
      {
        "step": "2",
        "title": "Select Target Date",
        "description": "By default, this is today, but you can change it to any historical or future date."
      },
      {
        "step": "3",
        "title": "View Result",
        "description": "Instantly see the exact calculation breakdown."
      }
    ],
    faqs: [
      {
        "question": "Does it account for leap years?",
        "answer": "Yes, the calendar engine natively accounts for leap years when calculating the exact number of days."
      },
      {
        "question": "Why do I need an age calculator?",
        "answer": "It is highly useful for filling out legal documents that require exact age in months/days, calculating historical durations, or determining a baby's exact age in months."
      }
    ],
  },
  {
    id: "27",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index (BMI) for adults.",
    metaDescription: "Calculate your Body Mass Index (BMI) using height and weight in metric or imperial units. Instantly see your BMI category and what it means for your health.",
    category: "calculators",
    keywords: ["bmi","calculator","health","weight","height","fitness"],
    icon: Activity,
    slug: "bmi-calculator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#3b82f6"},
    tagline: "Check your body mass index instantly.",
    valueProp: "Quickly evaluate if you are in a healthy weight range using the standard medical Body Mass Index formula.",
    seoTitle: "Free BMI Calculator — Check Your Body Mass Index",
    seoDescription: "Calculate your Body Mass Index (BMI) instantly. Free online health tool for checking weight categories. Supports Metric and Imperial units.",
    benefits: [
      "Unit Support: Easily toggle between Metric (kg/cm) and Imperial (lbs/ft) measurements.",
      "Instant Classification: Tells you immediately if you are Underweight, Normal, Overweight, or Obese.",
      "Color Coded: Visual indicators help you quickly grasp your health category.",
      "100% Private: Your height and weight data never leaves your browser."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Select Units",
        "description": "Choose between Metric or Imperial measurement systems."
      },
      {
        "step": "2",
        "title": "Input Metrics",
        "description": "Type in your current height and weight."
      },
      {
        "step": "3",
        "title": "View Score",
        "description": "See your exact BMI score and which health category you fall into."
      }
    ],
    faqs: [
      {
        "question": "What is a healthy BMI?",
        "answer": "According to the WHO, a healthy BMI range is between 18.5 and 24.9. A score below 18.5 is considered underweight, while 25 or above is overweight."
      },
      {
        "question": "Is BMI always accurate?",
        "answer": "No. BMI is a general screening tool, not a diagnostic one. It does not distinguish between muscle and fat, so athletes with high muscle mass may have a 'high' BMI but perfectly healthy body fat levels."
      }
    ],
  },
  {
    id: "28",
    name: "Percentage Calculator",
    description: "Easily calculate percentages, increases, and decreases.",
    metaDescription: "Calculate percentages, find what percent one number is of another, and compute percentage increases or decreases instantly. Simple, free math tool.",
    category: "calculators",
    keywords: ["percentage","percent","calculator","math","fraction"],
    icon: Percent,
    slug: "percentage-calculator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#3b82f6"},
    tagline: "Solve percentage math problems instantly.",
    valueProp: "Stop struggling with formulas. Instantly calculate tips, discounts, tax, and percentage changes with a clear interface.",
    seoTitle: "Free Percentage Calculator — Solve Math Instantly",
    seoDescription: "Calculate percentages, percentage increases, and discounts instantly. Free online percentage math tool for students and business.",
    benefits: [
      "Multiple Modes: Calculate 'X% of Y', 'X is what % of Y', or 'Percentage Increase/Decrease'.",
      "Instant Math: See the results update live as you type.",
      "Business Ready: Perfect for calculating retail discounts or tax markups on the fly.",
      "Student Friendly: Helps double-check math homework instantly."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Choose Mode",
        "description": "Select the type of percentage calculation you are trying to solve."
      },
      {
        "step": "2",
        "title": "Enter Numbers",
        "description": "Input your known variables into the fields."
      },
      {
        "step": "3",
        "title": "Get Answer",
        "description": "The exact result is displayed instantly."
      }
    ],
    faqs: [
      {
        "question": "How do you calculate a percentage increase?",
        "answer": "To find the percentage increase manually, subtract the old value from the new value, divide that difference by the old value, and multiply by 100. Our tool does this instantly."
      },
      {
        "question": "Is this useful for shopping?",
        "answer": "Absolutely. You can use it to instantly calculate how much money you will save if an item is marked '30% off'."
      }
    ],
  },
  {
    id: "29",
    name: "EMI Calculator",
    description: "Calculate Equated Monthly Installments for loans.",
    metaDescription: "Calculate monthly EMI for any loan amount, interest rate, and tenure. See a full amortization breakdown showing principal and interest for every payment.",
    category: "calculators",
    keywords: ["emi","loan","calculator","finance","interest","monthly"],
    icon: Landmark,
    slug: "emi-calculator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#3b82f6"},
    tagline: "Calculate your monthly loan payments.",
    valueProp: "Quickly determine exactly how much a loan will cost you per month and see the total interest you will pay over time.",
    seoTitle: "Free EMI Calculator — Loan & Mortgage Calculator",
    seoDescription: "Calculate Equated Monthly Installments (EMI) for home loans, car loans, and personal loans. Free online loan calculator.",
    benefits: [
      "Comprehensive Breakdown: View your monthly payment, total interest, and total payable amount.",
      "Adjustable Terms: Tweak the interest rate and loan tenure to see how it affects your budget.",
      "Instant Recalculation: See the numbers update in real-time as you slide the scales.",
      "Privacy First: Financial planning data is never tracked or logged."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Enter Loan Amount",
        "description": "Input the total principal amount you plan to borrow."
      },
      {
        "step": "2",
        "title": "Set Rate & Time",
        "description": "Enter the bank's interest rate and the duration (tenure) of the loan."
      },
      {
        "step": "3",
        "title": "View Payment",
        "description": "Instantly see exactly what your monthly payment (EMI) will be."
      }
    ],
    faqs: [
      {
        "question": "What does EMI stand for?",
        "answer": "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month."
      },
      {
        "question": "Does this tool work for Home Loans and Car Loans?",
        "answer": "Yes! The mathematical formula for standard amortizing loans is identical whether it's a home, car, or personal loan."
      },
      {
        "question": "How can I reduce my EMI?",
        "answer": "You can reduce your EMI by securing a lower interest rate, paying a larger down payment (reducing principal), or extending the loan tenure (which lowers the monthly payment but increases total interest paid)."
      }
    ],
  },
  {
    id: "30",
    name: "GST Calculator",
    description: "Calculate Goods and Services Tax (inclusive or exclusive).",
    metaDescription: "Calculate GST-inclusive or GST-exclusive prices for any tax rate. Instantly find the tax amount and net or gross totals for your business transactions.",
    category: "calculators",
    keywords: ["gst","tax","calculator","finance","business","percentage"],
    icon: Calculator,
    slug: "gst-calculator",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#6366f1","accentTo":"#3b82f6"},
    tagline: "Add or extract GST from any amount.",
    valueProp: "Easily calculate the exact tax amount for invoices by adding or reverse-calculating GST instantly.",
    seoTitle: "Free GST Calculator — Add or Remove Tax Online",
    seoDescription: "Instantly add GST to a price or remove GST from a total. Free online Goods and Services Tax calculator for business invoicing.",
    benefits: [
      "Add or Extract: Calculate the final price by adding tax, or extract the base price from a tax-inclusive total.",
      "Custom Rates: Pre-configured with common brackets (5%, 12%, 18%, 28%) and supports custom rates.",
      "Detailed Breakdown: See the exact Base Price, Tax Amount, and Final Price.",
      "Business Ready: Perfect for generating accurate invoices and receipts."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Enter Amount",
        "description": "Input the price."
      },
      {
        "step": "2",
        "title": "Select Action",
        "description": "Choose whether this price is Exclusive of tax (Add GST) or Inclusive of tax (Remove GST)."
      },
      {
        "step": "3",
        "title": "Pick Rate",
        "description": "Select the tax percentage to see the final breakdown instantly."
      }
    ],
    faqs: [
      {
        "question": "How do you calculate GST backward (Extract)?",
        "answer": "To extract GST from a total amount, you divide the total by (1 + (Tax Rate / 100)). Our tool does this complex reverse-math instantly."
      },
      {
        "question": "Does this work for VAT or Sales Tax?",
        "answer": "Yes! The mathematics for GST, VAT, and standard Sales Tax are identical. Just select your region's percentage rate."
      }
    ],
  },
  {
    id: "31",
    name: "URL Shortener",
    description: "Shorten long URLs into clean, manageable links.",
    metaDescription: "Shorten any long URL into a compact, shareable link. Preview your shortened links instantly with no sign-up required. Free and fast URL shortener.",
    category: "utilities",
    keywords: ["url","shortener","link","tiny","minify"],
    icon: LinkIcon,
    slug: "url-shortener",
            type: "utility",
    modules: [{"id":"main","label":"Core"}],
    brand: {"accentFrom":"#64748b","accentTo":"#6366f1"},
    tagline: "Condense long links into clean URLs.",
    valueProp: "Turn massively long tracking URLs into clean, shareable short links instantly without registering for an account.",
    seoTitle: "Free URL Shortener — Create Short Links Instantly",
    seoDescription: "Condense long, ugly URLs into clean, short links instantly. Free online URL shortener powered by TinyURL. No sign-up required.",
    benefits: [
      "One-Click Shortening: Paste a long URL and get a short one back instantly.",
      "TinyURL Integration: Powered by a highly reliable, world-renowned shortening API.",
      "Easy Copy: One click to copy the new link to your clipboard.",
      "100% Free: No limits on how many links you can shorten."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Paste URL",
        "description": "Paste your long, messy link into the input field."
      },
      {
        "step": "2",
        "title": "Shorten",
        "description": "Click the button to ping the shortening service."
      },
      {
        "step": "3",
        "title": "Share",
        "description": "Copy the returned short link and share it anywhere."
      }
    ],
    faqs: [
      {
        "question": "Do these short links expire?",
        "answer": "Our tool interfaces with TinyURL, which provides links that do not expire as long as the service remains active."
      },
      {
        "question": "Are short links safe?",
        "answer": "While short links are safe to generate, users clicking on them won't know the destination until they click. We recommend only shortening URLs for trusted sources."
      }
    ],
  },
  {
    id: "ripple",
    name: "Ripple",
    description: "Ripple helps you generate stunning text graphics.",
    metaDescription: "Transform text into beautiful, shareable graphics in seconds with Ripple.",
    category: "ai",
    keywords: ["ripple","graphics","social","text-to-image"],
    icon: Type,
    slug: "ripple",
            type: "original",
    modules: [{"id":"main","label":"Creator"}],
    brand: {"accentFrom":"#000000","accentTo":"#333333"},
    featured: true,
    tagline: "The visual way to explore JSON.",
    valueProp: "Stop squinting at massive JSON strings. Ripple fetches APIs and renders them into beautiful, collapsible visual trees instantly.",
    seoTitle: "Ripple — The Visual JSON API Client",
    seoDescription: "Ripple is a beautiful, visual JSON explorer and API client. Fetch, format, and visualize JSON trees instantly. Built by Atomest.",
    benefits: [
      "Visual Tree: Deeply nested JSON objects are rendered as beautiful, collapsible UI nodes.",
      "API Fetching: Directly paste an API URL and Ripple will fetch and render it securely.",
      "Syntax Validation: Automatically detects errors in raw JSON strings.",
      "Privacy First: Local evaluation ensures your sensitive JSON data is never logged."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Provide Data",
        "description": "Paste a raw JSON string or provide an endpoint URL."
      },
      {
        "step": "2",
        "title": "Parse",
        "description": "Ripple instantly validates and parses the structure."
      },
      {
        "step": "3",
        "title": "Explore",
        "description": "Click to expand or collapse nodes to navigate the data visually."
      }
    ],
    faqs: [
      {
        "question": "What is Ripple?",
        "answer": "Ripple is an Atomest Original product designed to make reading and navigating massive JSON payloads intuitive and visually pleasing, unlike traditional text-based formatters."
      },
      {
        "question": "Does it support authenticated APIs?",
        "answer": "Currently, Ripple supports public GET requests. For authenticated requests, you should copy the JSON response from your terminal and paste the raw text into Ripple."
      }
    ],
  },
  {
    id: "reality-check",
    name: "Reality Check",
    description: "Analyze any text for hidden biases and logical fallacies.",
    metaDescription: "Reality Check helps you analyze text for logical fallacies and emotional manipulation.",
    category: "ai",
    keywords: ["bias","analysis","truth","reality"],
    icon: Search,
    slug: "reality-check",
            type: "original",
    modules: [{"id":"main","label":"Scanner"}],
    brand: {"accentFrom":"#ef4444","accentTo":"#b91c1c"},
    featured: true,
    tagline: "Subject your ideas to brutal honesty.",
    valueProp: "Don't waste years building something nobody wants. Reality Check acts as an aggressive mentor that tears your idea apart to find its flaws.",
    seoTitle: "Reality Check — Startup Idea Validator",
    seoDescription: "Test your startup ideas against harsh reality. Get brutal, honest feedback on your business models instantly.",
    benefits: [
      "Honest Feedback: Cuts through the fake praise you get from friends.",
      "Critical Analysis: Highlights exact flaws in distribution, margins, and market size.",
      "Mental Model Refinement: Forces you to think clearly about your startup's viability.",
      "Private: Your revolutionary ideas are processed locally and never stored."
    ],
    howItWorks: [
      {
        "step": "1",
        "title": "Pitch Idea",
        "description": "Write a short paragraph explaining your startup idea and target market."
      },
      {
        "step": "2",
        "title": "Brace Yourself",
        "description": "Click submit and prepare for unfiltered, highly critical feedback."
      },
      {
        "step": "3",
        "title": "Iterate",
        "description": "Use the feedback to patch holes in your business model."
      }
    ],
    faqs: [
      {
        "question": "Is Reality Check actually a human?",
        "answer": "No, it is a specialized local evaluation matrix designed by Atomest to simulate the feedback you would get from a highly critical venture capitalist."
      },
      {
        "question": "Will you steal my idea?",
        "answer": "Absolutely not. Execution matters infinitely more than ideas, and regardless, the text you input is never sent to our servers for storage."
      }
    ],
  },
];
