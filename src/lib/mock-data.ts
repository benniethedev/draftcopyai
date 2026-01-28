// Mock data for client portal MVP
import { Project, Client, PortalStats, Draft } from '@/types/portal';

export const mockClient: Client = {
  id: 'client_1',
  name: 'Sarah Chen',
  email: 'sarah@techflow.io',
  company: 'TechFlow',
  plan: 'growth',
  avatar: undefined,
  createdAt: new Date('2024-01-15'),
};

const createDraft = (
  projectId: string,
  version: number,
  content: string,
  createdAt: Date,
  feedback?: string
): Draft => ({
  id: `draft_${projectId}_v${version}`,
  projectId,
  version,
  content,
  wordCount: content.split(/\s+/).length,
  seoScore: Math.floor(Math.random() * 20) + 80,
  readabilityScore: Math.floor(Math.random() * 15) + 85,
  createdAt,
  feedback,
});

export const mockProjects: Project[] = [
  {
    id: 'proj_1',
    clientId: 'client_1',
    brief: {
      id: 'brief_1',
      title: '10 Ways AI Is Transforming Content Marketing in 2024',
      contentType: 'blog_post',
      targetKeywords: ['AI content marketing', 'content automation', 'marketing AI tools'],
      targetAudience: 'B2B marketing managers and CMOs',
      tone: 'Professional but approachable, data-driven',
      wordCount: 2000,
      additionalNotes: 'Include specific examples of AI tools and case studies. Link to our previous post on marketing automation.',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01'),
    },
    status: 'completed',
    priority: 'normal',
    assignedEditor: 'Michael Torres',
    drafts: [],
    dueDate: new Date('2024-12-05'),
    completedAt: new Date('2024-12-04'),
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-04'),
  },
  {
    id: 'proj_2',
    clientId: 'client_1',
    brief: {
      id: 'brief_2',
      title: 'Why Your SaaS Needs a Content Strategy (Not Just Content)',
      contentType: 'blog_post',
      targetKeywords: ['SaaS content strategy', 'B2B content marketing', 'content planning'],
      targetAudience: 'SaaS founders and marketing leads',
      tone: 'Direct, slightly provocative, backed by data',
      wordCount: 1800,
      additionalNotes: 'Challenge the "just publish more" mentality. Focus on strategic thinking.',
      createdAt: new Date('2024-12-08'),
      updatedAt: new Date('2024-12-08'),
    },
    status: 'in_review',
    priority: 'normal',
    assignedEditor: 'Emma Rodriguez',
    drafts: [],
    dueDate: new Date('2024-12-12'),
    createdAt: new Date('2024-12-08'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: 'proj_3',
    clientId: 'client_1',
    brief: {
      id: 'brief_3',
      title: 'Q1 2025 Product Launch Email Sequence',
      contentType: 'email_sequence',
      targetKeywords: ['product launch', 'SaaS onboarding'],
      targetAudience: 'Existing customers and trial users',
      tone: 'Exciting but not salesy, helpful',
      wordCount: 1500,
      additionalNotes: '5 emails: teaser, launch day, feature highlight, social proof, final reminder',
      createdAt: new Date('2024-12-10'),
      updatedAt: new Date('2024-12-10'),
    },
    status: 'revision',
    priority: 'rush',
    assignedEditor: 'Michael Torres',
    drafts: [],
    dueDate: new Date('2024-12-14'),
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-12'),
  },
  {
    id: 'proj_4',
    clientId: 'client_1',
    brief: {
      id: 'brief_4',
      title: 'TechFlow Case Study: How Acme Corp Increased Leads by 340%',
      contentType: 'case_study',
      targetKeywords: ['lead generation case study', 'marketing automation ROI'],
      targetAudience: 'Enterprise decision makers',
      tone: 'Professional, results-focused, credible',
      wordCount: 2500,
      additionalNotes: 'Client has provided interview transcript. Focus on specific metrics and timeline.',
      competitorUrls: ['https://competitor.com/case-studies/similar'],
      createdAt: new Date('2024-12-12'),
      updatedAt: new Date('2024-12-12'),
    },
    status: 'draft',
    priority: 'normal',
    drafts: [],
    dueDate: new Date('2024-12-18'),
    createdAt: new Date('2024-12-12'),
    updatedAt: new Date('2024-12-12'),
  },
  {
    id: 'proj_5',
    clientId: 'client_1',
    brief: {
      id: 'brief_5',
      title: 'December Social Media Content Pack',
      contentType: 'social_media',
      targetKeywords: ['year in review', 'marketing trends 2025'],
      targetAudience: 'Marketing professionals on LinkedIn',
      tone: 'Thought leadership, conversational',
      wordCount: 800,
      additionalNotes: '10 LinkedIn posts, mix of carousel ideas and text posts',
      createdAt: new Date('2024-12-05'),
      updatedAt: new Date('2024-12-05'),
    },
    status: 'approved',
    priority: 'normal',
    assignedEditor: 'Emma Rodriguez',
    drafts: [],
    dueDate: new Date('2024-12-10'),
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-09'),
  },
];

// Add drafts to projects
mockProjects[0].drafts = [
  createDraft(
    'proj_1',
    1,
    `# 10 Ways AI Is Transforming Content Marketing in 2024

The marketing landscape has shifted dramatically. What once required teams of writers, editors, and strategists can now be accomplished in a fraction of the time—with the right AI tools and human oversight.

But here's the thing: AI isn't replacing marketers. It's amplifying them.

Let's dive into the ten most impactful ways artificial intelligence is reshaping content marketing this year.

## 1. Hyper-Personalized Content at Scale

Remember when "personalization" meant adding someone's first name to an email? Those days are gone.

AI now analyzes behavioral data, purchase history, and engagement patterns to create truly personalized content experiences. Netflix doesn't just recommend shows—they create different thumbnail images based on what they know you'll click. Marketing teams are following suit.

**The impact:** Companies using AI-driven personalization see 40% higher conversion rates on average.

## 2. Predictive Content Performance

Before you publish, AI can now predict how your content will perform. Tools analyze your headline, structure, keywords, and even sentiment to forecast engagement.

This isn't crystal ball magic—it's pattern recognition across millions of data points. The result? Less guesswork, more confidence.

## 3. Automated First Drafts

Here's where it gets interesting. AI can generate competent first drafts in seconds. Not publish-ready content, but solid starting points that capture the structure and key points.

Human editors then shape these drafts into something with voice, nuance, and accuracy. It's the best of both worlds: AI speed with human quality.

## 4. SEO Optimization in Real-Time

Gone are the days of publishing and hoping for the best. Modern AI tools analyze your content against current SERP data and suggest optimizations as you write.

Keyword density, semantic variations, heading structure—all optimized before you hit publish.

## 5. Content Repurposing Made Easy

One blog post can become ten pieces of content: social snippets, email teasers, video scripts, infographics. AI tools now handle this transformation automatically, maintaining consistency while adapting format and length.

## 6. Sentiment Analysis for Brand Voice

Maintaining brand voice across dozens of content pieces is challenging. AI now analyzes your existing content to build a "voice profile," then flags when new content drifts from that standard.

## 7. Competitive Content Intelligence

AI tools continuously monitor competitor content, identifying gaps and opportunities. They surface topics your competitors rank for that you don't—and vice versa.

## 8. Dynamic Content Testing

A/B testing headlines is table stakes. AI now enables multivariate testing across entire content pieces, automatically serving the best-performing version to each audience segment.

## 9. Automated Content Calendars

Based on historical performance data, industry trends, and seasonal patterns, AI can now suggest optimal publishing schedules and content mixes.

## 10. Real-Time Content Optimization

Content isn't static anymore. AI tools monitor performance and suggest updates to underperforming pieces—new keywords, restructured sections, updated statistics.

## The Human Element Remains Critical

Here's what AI can't do: understand your customers' deepest pain points. Build relationships. Exercise judgment about brand reputation. Fact-check with the skepticism of an experienced editor.

The winning formula isn't AI or humans. It's AI *and* humans, each doing what they do best.

---

*Ready to scale your content with AI speed and human polish? [Learn how DraftCopyAI can help](/contact).*`,
    new Date('2024-12-03')
  ),
  createDraft(
    'proj_1',
    2,
    `# 10 Ways AI Is Transforming Content Marketing in 2024

The marketing landscape has shifted dramatically. What once required teams of writers, editors, and strategists can now be accomplished in a fraction of the time—with the right AI tools and human oversight.

But here's the thing: AI isn't replacing marketers. It's amplifying them.

Let's dive into the ten most impactful ways artificial intelligence is reshaping content marketing this year.

## 1. Hyper-Personalized Content at Scale

Remember when "personalization" meant adding someone's first name to an email? Those days are gone.

AI now analyzes behavioral data, purchase history, and engagement patterns to create truly personalized content experiences. Netflix doesn't just recommend shows—they create different thumbnail images based on what they know you'll click. Marketing teams are following suit.

**The impact:** Companies using AI-driven personalization see 40% higher conversion rates on average, according to McKinsey's 2024 State of Marketing report.

## 2. Predictive Content Performance

Before you publish, AI can now predict how your content will perform. Tools like Clearscope, MarketMuse, and Frase analyze your headline, structure, keywords, and even sentiment to forecast engagement.

This isn't crystal ball magic—it's pattern recognition across millions of data points. The result? Less guesswork, more confidence.

## 3. Automated First Drafts

Here's where it gets interesting. AI can generate competent first drafts in seconds. Not publish-ready content, but solid starting points that capture the structure and key points.

Human editors then shape these drafts into something with voice, nuance, and accuracy. It's the best of both worlds: AI speed with human quality. (This is exactly the model we use at DraftCopyAI—AI creates the foundation, humans perfect it.)

## 4. SEO Optimization in Real-Time

Gone are the days of publishing and hoping for the best. Modern AI tools analyze your content against current SERP data and suggest optimizations as you write.

Keyword density, semantic variations, heading structure, internal linking opportunities—all optimized before you hit publish.

## 5. Content Repurposing Made Easy

One blog post can become ten pieces of content: social snippets, email teasers, video scripts, infographics. AI tools now handle this transformation automatically, maintaining consistency while adapting format and length.

**Pro tip:** Always have a human review repurposed content. AI occasionally misses context that matters for different platforms.

## 6. Sentiment Analysis for Brand Voice

Maintaining brand voice across dozens of content pieces is challenging. AI now analyzes your existing content to build a "voice profile," then flags when new content drifts from that standard.

This is especially valuable for teams working with multiple writers or agencies.

## 7. Competitive Content Intelligence

AI tools continuously monitor competitor content, identifying gaps and opportunities. They surface topics your competitors rank for that you don't—and vice versa.

This intelligence helps you stay ahead rather than constantly playing catch-up.

## 8. Dynamic Content Testing

A/B testing headlines is table stakes. AI now enables multivariate testing across entire content pieces, automatically serving the best-performing version to each audience segment.

## 9. Automated Content Calendars

Based on historical performance data, industry trends, and seasonal patterns, AI can now suggest optimal publishing schedules and content mixes.

No more arbitrary "let's post twice a week" decisions. Now it's data-driven.

## 10. Real-Time Content Optimization

Content isn't static anymore. AI tools monitor performance and suggest updates to underperforming pieces—new keywords, restructured sections, updated statistics.

This "content maintenance" approach keeps your library fresh and ranking.

## The Human Element Remains Critical

Here's what AI can't do: 
- Understand your customers' deepest pain points
- Build authentic relationships
- Exercise judgment about brand reputation
- Fact-check with the skepticism of an experienced editor
- Inject genuine creativity and insight

The winning formula isn't AI or humans. It's AI *and* humans, each doing what they do best.

## What This Means for Your Team

If you're not incorporating AI into your content workflow, you're likely falling behind competitors who are. But the goal isn't to automate everything—it's to automate the right things so your team can focus on strategy and creativity.

Start small: pick one or two of these applications and experiment. Track the results. Scale what works.

---

*Ready to scale your content with AI speed and human polish? [Learn how DraftCopyAI can help](/contact).*`,
    new Date('2024-12-04'),
    'Great improvements! The added specificity and examples really strengthen the piece. Approved for publication.'
  ),
];
mockProjects[0].currentDraft = mockProjects[0].drafts[1];

mockProjects[1].drafts = [
  createDraft(
    'proj_2',
    1,
    `# Why Your SaaS Needs a Content Strategy (Not Just Content)

Here's a uncomfortable truth: publishing more content won't save your marketing.

I see it constantly. SaaS companies cranking out blog posts, social updates, and email newsletters like their life depends on it. The content calendar is full. The metrics look busy. But pipeline? Flat.

The problem isn't output. It's strategy—or rather, the lack of it.

## The "More Content" Trap

Let's talk about what happens when you mistake activity for progress.

You hire writers. You publish twice a week. Traffic goes up (sort of). You celebrate the vanity metrics. But six months later, you're looking at the same conversion rate, the same lead quality, and a lot of content that nobody remembers.

Sound familiar?

**The data is brutal:** According to Orbit Media, the average blog post takes 4 hours to write. If you're publishing twice a week, that's 400+ hours per year. What's your return on those hours?

## Strategy vs. Tactics: Know the Difference

Content is a tactic. Strategy is the thinking that makes tactics work.

**Tactics:** 
- Write a blog post about [keyword]
- Post on LinkedIn three times a week
- Send a monthly newsletter

**Strategy:**
- Identify the 5 questions prospects ask before buying
- Create definitive content that answers each one
- Build a content ecosystem that guides prospects from awareness to decision
- Measure what actually influences pipeline, not just traffic

See the difference? One is a to-do list. The other is a system designed to achieve a specific outcome.

## What a Real Content Strategy Includes

### 1. Customer Journey Mapping

Before you write anything, you need to understand:
- What triggers someone to look for a solution like yours?
- What questions do they ask at each stage?
- What objections do they have?
- What makes them choose you over alternatives?

This isn't guesswork. Talk to customers. Talk to sales. Review call recordings. The insights are there if you look.

### 2. Content-Market Fit

Not every topic deserves your attention. A good strategy identifies:
- Topics with search demand (people are actively looking)
- Topics you can credibly own (you have genuine expertise)
- Topics that lead somewhere (they attract potential buyers, not just browsers)

The intersection of these three? That's your content sweet spot.

### 3. Content Architecture

Random blog posts don't build authority. Interconnected content ecosystems do.

Think in terms of:
- **Pillar content:** Comprehensive guides on your core topics
- **Supporting content:** Posts that explore specific aspects in depth
- **Conversion content:** Case studies, comparisons, and bottom-funnel pieces

Every piece should have a purpose and a place in the larger structure.

### 4. Distribution Built In

Great content with no distribution plan is just expensive journaling.

Your strategy should answer:
- How will this reach our target audience?
- What channels will we use?
- How will we repurpose this across platforms?
- What's our promotion timeline?

## The Strategic Shift

Here's what changes when you move from "content" to "content strategy":

| Before (Tactical) | After (Strategic) |
|-------------------|-------------------|
| "We need more blog posts" | "We need to rank for [specific keyword] because it captures high-intent traffic" |
| "Let's post on social more" | "LinkedIn drives 40% of our demo requests, so we'll double down there with thought leadership content" |
| "Everyone does a newsletter" | "Our newsletter will focus on [specific angle] to build authority with [specific audience]" |

## How to Get Started

If you're currently stuck in the content treadmill, here's how to shift to strategy:

1. **Audit what you have.** Which pieces actually drive conversions? Which are dead weight?

2. **Talk to customers.** Not surveys—actual conversations. What content helped them decide?

3. **Define your content pillars.** What 3-5 topics should you absolutely own?

4. **Build your ecosystem.** Map how pieces connect and guide readers forward.

5. **Set meaningful metrics.** Traffic is nice. Pipeline influence is better.

## The Bottom Line

You don't need more content. You need better thinking about content.

Strategy isn't a luxury for big companies with big budgets. It's the difference between content that works and content that just exists.

Stop filling calendars. Start building systems.

---

*Need help building a content strategy that actually drives growth? [Let's talk](/contact).*`,
    new Date('2024-12-10')
  ),
];
mockProjects[1].currentDraft = mockProjects[1].drafts[0];

mockProjects[2].drafts = [
  createDraft(
    'proj_3',
    1,
    `# Q1 2025 Product Launch Email Sequence

## Email 1: The Teaser (Send: 2 weeks before launch)

**Subject line options:**
- Something big is coming Jan 15th
- We've been working on this for 8 months
- [First name], clear your calendar for Jan 15

---

Hey [First name],

Quick heads up: we're launching something big on January 15th.

I can't share details yet (our marketing team would kill me), but here's what I can tell you:

It's the #1 requested feature from the past year. It's going to change how you [core job-to-be-done]. And existing customers get early access.

Keep an eye on your inbox. More details coming soon.

[Signature]

P.S. - Reply to this email if you want to be first in line for the announcement.

---

## Email 2: Launch Day

**Subject line options:**
- It's here: [Feature name]
- [First name], meet [Feature name]
- The wait is over

---

Hey [First name],

It's official: [Feature name] is live.

Here's what it does:
- [Benefit 1 in customer language]
- [Benefit 2 in customer language]  
- [Benefit 3 in customer language]

We've been testing this with a small group for the past month. The results? [Specific metric or outcome].

**Your account is already upgraded.** Just log in and you'll see [Feature name] in your dashboard.

[CTA Button: Try [Feature name] Now]

Questions? Hit reply—I read every response.

[Signature]

---

## Email 3: Feature Deep Dive (Send: 3 days after launch)

**Subject line options:**
- How [Customer name] is using [Feature name]
- 3 ways to get more from [Feature name]
- Did you try [Feature name] yet?

---

Hey [First name],

[Feature name] has been live for a few days now. Here's what we're seeing:

**Most popular use case:** [Description]

**Unexpected win:** [Something customers discovered]

**Quick tip:** [Specific tactical advice]

Here's a 2-minute video showing the three most popular ways customers are using [Feature name]:

[Video thumbnail/link]

Haven't tried it yet? No pressure—it'll be there when you're ready. But I'd love to hear what you think when you do.

[Signature]

---

## Email 4: Social Proof (Send: 1 week after launch)

**Subject line options:**
- "[Quote from customer about feature]"
- What [Company] said about [Feature name]
- Results from the first week

---

Hey [First name],

A week in, and the feedback on [Feature name] has been incredible.

Here's what customers are saying:

> "[Testimonial 1]"
> — [Name], [Title] at [Company]

> "[Testimonial 2]"  
> — [Name], [Title] at [Company]

**By the numbers:**
- [X] customers activated [Feature name] in week 1
- [Metric showing impact]
- [Another metric]

The team is blown away by the response. Thank you for being part of this community.

[CTA: See [Feature name] in action]

[Signature]

---

## Email 5: Final Reminder / FOMO (Send: 2 weeks after launch)

**Subject line options:**
- Last chance for [limited offer if applicable]
- Still haven't tried [Feature name]?
- Quick question about [Feature name]

---

Hey [First name],

I noticed you haven't tried [Feature name] yet. Totally fine—everyone moves at their own pace.

But I wanted to make sure you didn't miss this:

[If there's a limited offer: Details here]

[If no offer: Here's a quick win you can get in the next 5 minutes with [Feature name]: specific action]

Here's the fastest way to get started:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Takes about 3 minutes. And if you hit any snags, just reply to this email.

[CTA: Get started now]

[Signature]

P.S. - If [Feature name] isn't right for you, no worries at all. Just let me know and I'll stop the [Feature name] emails. 👍`,
    new Date('2024-12-11'),
    'Good structure! A few revision requests: 1) Make Email 1 teaser more specific about the pain point it solves, 2) Add urgency element to Email 5, 3) Include specific CTAs with button styling notes. Thanks!'
  ),
];
mockProjects[2].currentDraft = mockProjects[2].drafts[0];

export const mockStats: PortalStats = {
  totalProjects: mockProjects.length,
  activeProjects: mockProjects.filter(p => !['completed', 'approved'].includes(p.status)).length,
  completedProjects: mockProjects.filter(p => p.status === 'completed').length,
  pendingRevisions: mockProjects.filter(p => p.status === 'revision').length,
};

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(p => p.id === id);
};

export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return mockProjects.filter(p => p.status === status);
};
