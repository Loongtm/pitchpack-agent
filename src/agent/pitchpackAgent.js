const defaultFields = {
  projectName: 'BuilderFlow Agent',
  projectIdea:
    'An AI agent that helps hackathon teams turn raw project notes into complete submission materials.',
  targetUsers: 'hackathon builders, solo developers, startup teams, and AI agents',
  techStack: 'React, Vite, JavaScript, CROO-style agent workflow, CAP-style receipt',
  track: 'Creator & Content Ops Agents'
};

const splitList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const normalize = (input) => ({
  projectName: input.projectName?.trim() || defaultFields.projectName,
  projectIdea: input.projectIdea?.trim() || defaultFields.projectIdea,
  targetUsers: input.targetUsers?.trim() || defaultFields.targetUsers,
  techStack: input.techStack?.trim() || defaultFields.techStack,
  track: input.track?.trim() || defaultFields.track
});

const buildFeatures = (projectName) => [
  `Collects raw project context for ${projectName}`,
  'Transforms rough notes into judge-ready submission content',
  'Generates a BUIDL description, README outline, pitch, and demo script',
  'Creates a CAP-style agent job receipt for structured task output',
  'Supports fast copy-and-submit workflow for hackathon teams'
];

const buildReceipt = (data, sections) => ({
  protocolStyle: 'CROO CAP-style task receipt',
  agentName: 'PitchPack Agent',
  taskType: 'creator_content_ops.submission_pack.generate',
  projectName: data.projectName,
  track: data.track,
  status: 'completed',
  paymentMode: 'demo_mock_usdc_per_call',
  deliverables: Object.keys(sections),
  proof: {
    outputFormat: 'structured_json_and_markdown',
    generatedAt: new Date().toISOString(),
    checksumHint: `${data.projectName.replace(/\s+/g, '-').toLowerCase()}-${Object.keys(sections).length}-sections`
  }
});

export function generatePitchPack(input) {
  const data = normalize(input);
  const techItems = splitList(data.techStack);
  const features = buildFeatures(data.projectName);

  const buidlDescription = `${data.projectName} is an AI-powered content operations agent for ${data.targetUsers}. It solves the common hackathon problem where strong technical projects lose judge attention because the submission is unclear, incomplete, or poorly packaged. The agent converts a rough idea into a complete judge-ready submission pack with a polished BUIDL description, problem-solution narrative, README outline, demo video script, 60-second pitch, social launch post, and a CAP-style job receipt. Built for the ${data.track} track, it demonstrates how a callable agent can provide paid creative operations support inside an agent economy.`;

  const problemStatement = `Hackathon builders often know what they built, but they struggle to explain it clearly under deadline pressure. This creates a packaging gap: project pages are incomplete, README files are weak, demo videos are unstructured, and judges cannot understand the product value quickly. ${data.projectName} addresses this gap by turning raw builder notes into clear, structured, and submission-ready materials.`;

  const solution = `${data.projectName} acts as a callable packaging agent. The user provides the project name, rough idea, target users, technology stack, and hackathon track. The agent then produces a complete submission pack that helps the builder move from unfinished notes to a professional submission workflow.`;

  const readmeStarter = `# ${data.projectName}\n\n## Overview\n\n${data.projectIdea}\n\n## Target Users\n\n${data.targetUsers}\n\n## Track\n\n${data.track}\n\n## Key Features\n\n${features.map((feature) => `- ${feature}`).join('\n')}\n\n## Tech Stack\n\n${techItems.map((item) => `- ${item}`).join('\n') || '- JavaScript\n- React'}\n\n## Demo\n\nThe demo shows how a builder submits rough project information and receives a complete hackathon submission pack.`;

  const pitchScript = `Hi judges, this is ${data.projectName}. Hackathon builders usually focus on building, but many lose points because their final submission is unclear. Our agent solves that problem by turning a rough project idea into a complete judge-ready package. It generates the BUIDL description, README outline, problem statement, feature explanation, demo video script, pitch script, and a structured CAP-style receipt. This makes it useful not only for human builders, but also for an agent economy where one agent can hire another agent to handle content operations. The result is faster submission preparation, clearer judging, and better project discovery.`;

  const demoScript = `1. Open ${data.projectName}.\n2. Enter a rough project idea.\n3. Add target users, tech stack, and hackathon track.\n4. Click Generate Submission Pack.\n5. Show the generated BUIDL description, README starter, pitch script, and demo script.\n6. Open the CAP-style receipt and explain that the task is represented as a completed agent job.\n7. End by showing how the content can be copied into DoraHacks and GitHub.`;

  const socialPost = `🚀 Introducing ${data.projectName}\n\nA content operations agent that turns rough hackathon ideas into judge-ready submission packs.\n\nBuilt for ${data.track}.\n\nIt generates:\n✅ BUIDL descriptions\n✅ README starters\n✅ 60-second pitches\n✅ Demo video scripts\n✅ CAP-style task receipts\n\nHelping builders explain better, submit faster, and get discovered.`;

  const sections = {
    buidlDescription,
    problemStatement,
    solution,
    keyFeatures: features.join('\n'),
    readmeStarter,
    pitchScript,
    demoScript,
    socialPost
  };

  return {
    ...sections,
    receipt: buildReceipt(data, sections)
  };
}
