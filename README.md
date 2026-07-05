# PitchPack Agent

**PitchPack Agent** is a creator and content operations agent for hackathon builders. It turns a rough project idea into a judge-ready submission pack, including a BUIDL description, README outline, 60-second pitch, demo video script, social launch post, and a CAP-style job receipt.

This project is built for the **CROO Agent Hackathon** under the **Creator & Content Ops Agents** direction.

## Problem

Hackathon builders often spend most of their energy building the product, but their final submission is weak: unclear description, poor README, no demo script, and no strong pitch. Good projects can be overlooked because the explanation is not judge-ready.

## Solution

PitchPack Agent helps builders package their project properly. A user enters a rough idea, target users, technology stack, and hackathon track. The agent generates a structured submission pack that can be used for DoraHacks, GitHub README, pitch delivery, demo video recording, and social sharing.

## Key Features

- Generate a DoraHacks-ready BUIDL description
- Create a problem statement and solution summary
- Produce key features and technical architecture text
- Generate a README starter section
- Generate a 60-second pitch script
- Generate a demo video script
- Generate a social launch post
- Create a CAP-style JSON job receipt for agent-call demonstration
- Copy generated sections quickly during submission preparation

## CROO / A2A Angle

PitchPack Agent is designed as a callable content operations agent in an agent economy. A builder, startup team, or another AI agent can hire it to package raw project data into submission-ready content. The generated job receipt demonstrates how a completed agent task can be represented with structured output, timestamp, track metadata, deliverables, and proof fields.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Local agent logic for MVP generation
- CAP-style JSON receipt mock for demo purposes

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Demo Flow

1. Open PitchPack Agent.
2. Enter a rough hackathon idea.
3. Select a hackathon track.
4. Click **Generate Submission Pack**.
5. Review the generated BUIDL description, README, pitch, demo script, launch post, and CAP-style receipt.
6. Copy the generated content into a hackathon submission.

## Example Use Case

A builder enters:

> AI wallet risk assistant that checks wallet activity and explains risky DeFi positions.

PitchPack Agent converts it into:

- A polished project description
- A clear problem-solution narrative
- Feature list
- Technical explanation
- Demo video script
- Social launch post
- Structured agent job receipt

## Project Status

MVP built for hackathon submission. Future versions can connect to live LLM APIs, CROO agent marketplace flows, wallet-based payments, and on-chain proof of generated deliverables.

## License

MIT
