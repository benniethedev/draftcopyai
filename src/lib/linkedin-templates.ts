// LinkedIn Outreach Templates for B2B Content Marketing Services

export interface TemplateVariable {
  key: string;
  label: string;
  placeholder: string;
  example: string;
}

export interface LinkedInTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  industry?: Industry;
  description: string;
  subject?: string; // For InMail
  body: string;
  variables: TemplateVariable[];
  tips?: string[];
  sequenceDay?: number; // For follow-up templates
}

export type TemplateCategory =
  | 'connection-request'
  | 'cold-outreach'
  | 'follow-up'
  | 'inmail';

export type Industry =
  | 'saas'
  | 'ecommerce'
  | 'professional-services'
  | 'fintech'
  | 'healthcare'
  | 'manufacturing'
  | 'general';

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  'connection-request': 'Connection Request',
  'cold-outreach': 'Cold Outreach',
  'follow-up': 'Follow-Up Sequence',
  'inmail': 'InMail',
};

export const INDUSTRY_LABELS: Record<Industry, string> = {
  saas: 'SaaS / Tech',
  ecommerce: 'E-commerce / DTC',
  'professional-services': 'Professional Services',
  fintech: 'Fintech',
  healthcare: 'Healthcare',
  manufacturing: 'Manufacturing / B2B',
  general: 'General',
};

export const CATEGORY_DESCRIPTIONS: Record<TemplateCategory, string> = {
  'connection-request': 'Short messages for connection requests (300 char limit)',
  'cold-outreach': 'Initial outreach after connecting',
  'follow-up': 'Strategic follow-up sequence over time',
  'inmail': 'Premium InMail messages for non-connections',
};

// Common variables used across templates
const COMMON_VARIABLES: TemplateVariable[] = [
  { key: 'firstName', label: 'First Name', placeholder: '{{firstName}}', example: 'Sarah' },
  { key: 'company', label: 'Company', placeholder: '{{company}}', example: 'Acme Corp' },
  { key: 'yourName', label: 'Your Name', placeholder: '{{yourName}}', example: 'Alex' },
];

export const LINKEDIN_TEMPLATES: LinkedInTemplate[] = [
  // ============================================
  // CONNECTION REQUEST TEMPLATES
  // ============================================
  {
    id: 'conn-mutual-interest',
    name: 'Mutual Interest Connect',
    category: 'connection-request',
    industry: 'general',
    description: 'Friendly connection based on shared content interests',
    body: `Hi {{firstName}}, I've been following {{company}}'s growth and love your content approach. As someone who helps B2B companies scale their content, I'd love to connect and share insights. – {{yourName}}`,
    variables: COMMON_VARIABLES,
    tips: [
      'Keep under 300 characters',
      'Personalize with something specific you noticed',
    ],
  },
  {
    id: 'conn-content-compliment',
    name: 'Content Compliment',
    category: 'connection-request',
    industry: 'general',
    description: 'Connect by complimenting their content or posts',
    body: `{{firstName}}, your recent post on {{topic}} really resonated. I work with B2B brands on content strategy and thought we could exchange ideas. Would love to connect!`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'topic', label: 'Topic/Post', placeholder: '{{topic}}', example: 'thought leadership' },
    ],
    tips: [
      'Reference a specific post or article',
      'Show genuine interest, not just flattery',
    ],
  },
  {
    id: 'conn-industry-peer',
    name: 'Industry Peer',
    category: 'connection-request',
    industry: 'general',
    description: 'Connect as a fellow professional in the space',
    body: `Hi {{firstName}} – noticed we're both in the B2B content space. Always looking to connect with sharp marketers. Would be great to be in each other's network!`,
    variables: COMMON_VARIABLES,
    tips: [
      'Works well for marketing directors and CMOs',
      'Casual tone works better than formal',
    ],
  },
  {
    id: 'conn-event-mention',
    name: 'Event/Webinar Reference',
    category: 'connection-request',
    industry: 'general',
    description: 'Connect after seeing them at a virtual event',
    body: `{{firstName}}, saw your comments in the {{event}} session – great insights on {{topic}}. Would love to connect and continue the conversation.`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'event', label: 'Event Name', placeholder: '{{event}}', example: 'Content Marketing World webinar' },
      { key: 'topic', label: 'Topic', placeholder: '{{topic}}', example: 'content distribution' },
    ],
  },

  // ============================================
  // COLD OUTREACH - SaaS
  // ============================================
  {
    id: 'cold-saas-scaling',
    name: 'SaaS Content Scaling',
    category: 'cold-outreach',
    industry: 'saas',
    description: 'For SaaS companies looking to scale content production',
    body: `Hi {{firstName}},

Noticed {{company}} has been growing fast – congrats on the momentum! 🚀

Quick question: how are you keeping up with content demand as you scale? 

I ask because we help SaaS companies like yours produce 10x more SEO content without 10x the headache. Our clients typically see {{result}} within the first few months.

Would it make sense to chat for 15 min about your content roadmap?

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'result', label: 'Result/Benefit', placeholder: '{{result}}', example: '40% increase in organic traffic' },
    ],
    tips: [
      'Research their content gaps before reaching out',
      'Mention specific metrics when possible',
    ],
  },
  {
    id: 'cold-saas-thought-leadership',
    name: 'SaaS Thought Leadership',
    category: 'cold-outreach',
    industry: 'saas',
    description: 'Position thought leadership as competitive advantage',
    body: `{{firstName}}, quick thought:

In a crowded SaaS market, the companies that own the narrative win. I noticed {{company}} has great product content but could be doing more to position {{leaderName}} as a category thought leader.

We help SaaS founders and executives build authority through strategic content – articles, LinkedIn presence, speaking opps.

Worth a conversation? I have a few ideas specific to your space.

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'leaderName', label: 'Executive Name', placeholder: '{{leaderName}}', example: 'your CEO' },
    ],
  },

  // ============================================
  // COLD OUTREACH - E-commerce
  // ============================================
  {
    id: 'cold-ecom-content-gap',
    name: 'E-commerce Content Gap',
    category: 'cold-outreach',
    industry: 'ecommerce',
    description: 'Address content gaps for DTC brands',
    body: `Hi {{firstName}},

Been browsing {{company}}'s site – love the products. Quick observation: your {{contentGap}} could be doing more heavy lifting for SEO and conversions.

We specialize in helping e-commerce brands create content that ranks AND converts. Recent client saw {{result}} after we revamped their content strategy.

Open to a quick call to see if this makes sense for {{company}}?

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'contentGap', label: 'Content Gap', placeholder: '{{contentGap}}', example: 'buying guides' },
      { key: 'result', label: 'Result', placeholder: '{{result}}', example: '65% increase in organic revenue' },
    ],
  },
  {
    id: 'cold-ecom-brand-story',
    name: 'E-commerce Brand Story',
    category: 'cold-outreach',
    industry: 'ecommerce',
    description: 'Focus on brand storytelling for DTC',
    body: `{{firstName}},

Great brands don't just sell products – they tell stories. I've been watching {{company}}'s growth and think there's a huge opportunity to amplify your brand narrative.

We help DTC brands create content that builds emotional connection – the kind that turns one-time buyers into loyal fans.

Would love to share some ideas. 15 minutes this week?

{{yourName}}`,
    variables: COMMON_VARIABLES,
  },

  // ============================================
  // COLD OUTREACH - Professional Services
  // ============================================
  {
    id: 'cold-proserv-authority',
    name: 'Professional Services Authority',
    category: 'cold-outreach',
    industry: 'professional-services',
    description: 'Build authority for consulting/agency',
    body: `Hi {{firstName}},

In professional services, your reputation IS your pipeline. I noticed {{company}} has strong credentials but could be getting more mileage from thought leadership content.

We help firms like yours turn expertise into content that attracts clients – case studies, white papers, LinkedIn content that positions you as the go-to experts.

Worth exploring? I'd love to share how we've helped similar firms.

{{yourName}}`,
    variables: COMMON_VARIABLES,
    tips: [
      'Research their existing thought leadership',
      'Mention specific service lines if possible',
    ],
  },

  // ============================================
  // COLD OUTREACH - Fintech
  // ============================================
  {
    id: 'cold-fintech-trust',
    name: 'Fintech Trust Building',
    category: 'cold-outreach',
    industry: 'fintech',
    description: 'Content for building trust in fintech',
    body: `{{firstName}},

In fintech, trust is everything – and content is how you build it at scale.

I noticed {{company}} is doing interesting things in {{niche}}. Are you investing in educational content to help prospects understand (and trust) your solution?

We help fintech companies create content that simplifies complex topics and builds credibility. Would love to share some approaches that have worked for companies in your space.

Quick chat?

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'niche', label: 'Niche/Focus', placeholder: '{{niche}}', example: 'B2B payments' },
    ],
  },

  // ============================================
  // COLD OUTREACH - Healthcare
  // ============================================
  {
    id: 'cold-healthcare-education',
    name: 'Healthcare Educational Content',
    category: 'cold-outreach',
    industry: 'healthcare',
    description: 'Educational content for healthcare/medtech',
    body: `Hi {{firstName}},

Healthcare buyers do serious research before making decisions. Is {{company}} showing up when they're searching for solutions?

We help healthcare and medtech companies create compliant, authoritative content that educates prospects and builds trust. Think white papers, case studies, and thought leadership that passes legal review.

Would it be worth 15 minutes to discuss your content strategy?

{{yourName}}`,
    variables: COMMON_VARIABLES,
    tips: [
      'Emphasize compliance experience',
      'Mention any healthcare clients (anonymized)',
    ],
  },

  // ============================================
  // COLD OUTREACH - Manufacturing
  // ============================================
  {
    id: 'cold-manufacturing-technical',
    name: 'Manufacturing Technical Content',
    category: 'cold-outreach',
    industry: 'manufacturing',
    description: 'Technical content for B2B manufacturing',
    body: `{{firstName}},

Manufacturing buyers are engineers – they want specs, data, and proof. Is your content speaking their language?

I noticed {{company}} has great products but your content could be doing more to capture technical buyers searching for solutions like yours.

We specialize in B2B technical content – the kind that engineers actually read. Would love to share how we've helped similar companies.

{{yourName}}`,
    variables: COMMON_VARIABLES,
  },

  // ============================================
  // COLD OUTREACH - General
  // ============================================
  {
    id: 'cold-general-pain',
    name: 'General Pain Point',
    category: 'cold-outreach',
    industry: 'general',
    description: 'Address common content pain points',
    body: `Hi {{firstName}},

Quick question – is content one of those things that's always on your to-do list but never quite gets done consistently?

You're not alone. Most B2B teams know they need more content but don't have bandwidth to produce it at quality.

That's exactly what we solve for companies like {{company}}. We become your content engine so you can focus on what you do best.

Worth a conversation?

{{yourName}}`,
    variables: COMMON_VARIABLES,
  },
  {
    id: 'cold-general-results',
    name: 'General Results-Focused',
    category: 'cold-outreach',
    industry: 'general',
    description: 'Lead with specific results',
    body: `{{firstName}},

What would {{result}} mean for {{company}}'s pipeline?

That's what we helped {{socialProof}} achieve in {{timeframe}} through strategic content marketing.

I have a few ideas for how {{company}} could see similar results. Worth 15 minutes to explore?

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'result', label: 'Result', placeholder: '{{result}}', example: '3x increase in qualified leads' },
      { key: 'socialProof', label: 'Client Reference', placeholder: '{{socialProof}}', example: 'a similar B2B company' },
      { key: 'timeframe', label: 'Timeframe', placeholder: '{{timeframe}}', example: '6 months' },
    ],
  },

  // ============================================
  // FOLLOW-UP SEQUENCE
  // ============================================
  {
    id: 'followup-day2',
    name: 'Day 2 - Soft Bump',
    category: 'follow-up',
    sequenceDay: 2,
    description: 'Gentle follow-up with added value',
    body: `{{firstName}}, quick follow-up on my note.

Was thinking about {{company}} and came across this {{resource}} that might be useful: {{link}}

Let me know if you'd like to chat about your content strategy.

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'resource', label: 'Resource Type', placeholder: '{{resource}}', example: 'article' },
      { key: 'link', label: 'Resource Link', placeholder: '{{link}}', example: '[link]' },
    ],
    tips: [
      'Always provide value, not just a bump',
      'Share relevant content they would find useful',
    ],
  },
  {
    id: 'followup-day5',
    name: 'Day 5 - Case Study Hook',
    category: 'follow-up',
    sequenceDay: 5,
    description: 'Share relevant case study or result',
    body: `Hi {{firstName}},

Wanted to share a quick win – we just helped a {{industry}} company similar to {{company}} achieve {{result}}.

The approach might work for you too. Happy to share the details if you're curious.

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'industry', label: 'Industry', placeholder: '{{industry}}', example: 'B2B SaaS' },
      { key: 'result', label: 'Result', placeholder: '{{result}}', example: '50% more organic leads' },
    ],
  },
  {
    id: 'followup-day10',
    name: 'Day 10 - Breakup Email',
    category: 'follow-up',
    sequenceDay: 10,
    description: 'Final follow-up with clear close',
    body: `{{firstName}},

I've reached out a couple times about helping {{company}} with content – no worries if the timing isn't right.

I'll leave the ball in your court. If content marketing ever becomes a priority, I'm here.

Best,
{{yourName}}

P.S. Feel free to connect here – I share B2B content tips regularly.`,
    variables: COMMON_VARIABLES,
    tips: [
      'Keep it short and respectful',
      'Leave the door open without being pushy',
    ],
  },
  {
    id: 'followup-day7-question',
    name: 'Day 7 - Simple Question',
    category: 'follow-up',
    sequenceDay: 7,
    description: 'Ask a simple, engaging question',
    body: `{{firstName}} – curious: what's your biggest content challenge right now?

I work with a lot of {{industry}} companies and hear common themes. Would love to know what you're facing.

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'industry', label: 'Industry', placeholder: '{{industry}}', example: 'B2B' },
    ],
  },

  // ============================================
  // INMAIL TEMPLATES
  // ============================================
  {
    id: 'inmail-high-value',
    name: 'High-Value Prospect',
    category: 'inmail',
    industry: 'general',
    subject: 'Quick idea for {{company}}',
    description: 'Premium outreach for decision makers',
    body: `{{firstName}},

I know your inbox is full, so I'll be brief.

{{company}} is clearly doing well – {{observation}}. But I noticed an opportunity: {{opportunity}}.

We've helped similar companies {{result}} through strategic content marketing.

Worth a 15-minute call? I promise not to pitch – just share ideas.

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'observation', label: 'Positive Observation', placeholder: '{{observation}}', example: 'your recent Series B signals serious momentum' },
      { key: 'opportunity', label: 'Opportunity', placeholder: '{{opportunity}}', example: 'your content could be doing more to capture organic demand' },
      { key: 'result', label: 'Result', placeholder: '{{result}}', example: 'double their organic pipeline' },
    ],
    tips: [
      'InMails have higher response rates – make them count',
      'Research thoroughly before sending',
    ],
  },
  {
    id: 'inmail-competitor-insight',
    name: 'Competitor Insight',
    category: 'inmail',
    industry: 'general',
    subject: 'Noticed something about {{competitor}}',
    description: 'Use competitive intelligence as hook',
    body: `{{firstName}},

I was researching {{company}}'s space and noticed {{competitor}} is investing heavily in content – they're ranking for {{keywords}}.

There's an opportunity for {{company}} to compete (and win) with the right content strategy.

Would love to share what I'm seeing and how we could help. 15 minutes?

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'competitor', label: 'Competitor', placeholder: '{{competitor}}', example: 'your competitor' },
      { key: 'keywords', label: 'Keywords/Topics', placeholder: '{{keywords}}', example: 'key industry terms' },
    ],
  },
  {
    id: 'inmail-trigger-event',
    name: 'Trigger Event',
    category: 'inmail',
    industry: 'general',
    subject: 'Congrats on {{event}}',
    description: 'Use funding, hiring, or news as hook',
    body: `{{firstName}},

Congrats on {{event}} – exciting times for {{company}}!

Usually after {{eventType}}, content becomes a priority to support growth goals. Is that on your radar?

We specialize in helping companies at this stage scale their content without scaling their team.

Would love to share some ideas if you're interested.

{{yourName}}`,
    variables: [
      ...COMMON_VARIABLES,
      { key: 'event', label: 'Event', placeholder: '{{event}}', example: 'the Series A' },
      { key: 'eventType', label: 'Event Type', placeholder: '{{eventType}}', example: 'funding rounds' },
    ],
    tips: [
      'Set up Google Alerts for target accounts',
      'Move fast – trigger events are time-sensitive',
    ],
  },
  {
    id: 'inmail-executive-brief',
    name: 'Executive Positioning',
    category: 'inmail',
    industry: 'general',
    subject: 'Building your profile as {{company}} grows',
    description: 'Personal brand building for executives',
    body: `{{firstName}},

As {{company}} scales, your personal brand becomes increasingly important – for recruiting, fundraising, and deal flow.

I help executives build thought leadership through strategic content. Not ghostwriting that sounds generic, but authentic content that positions you as a category leader.

Worth a conversation? I'd love to share some examples.

{{yourName}}`,
    variables: COMMON_VARIABLES,
  },
];

// Helper functions
export function getTemplatesByCategory(category: TemplateCategory): LinkedInTemplate[] {
  return LINKEDIN_TEMPLATES.filter(t => t.category === category);
}

export function getTemplatesByIndustry(industry: Industry): LinkedInTemplate[] {
  return LINKEDIN_TEMPLATES.filter(t => t.industry === industry || t.industry === 'general');
}

export function getFollowUpSequence(): LinkedInTemplate[] {
  return LINKEDIN_TEMPLATES
    .filter(t => t.category === 'follow-up')
    .sort((a, b) => (a.sequenceDay || 0) - (b.sequenceDay || 0));
}

export function fillTemplate(template: LinkedInTemplate, values: Record<string, string>): { subject?: string; body: string } {
  let body = template.body;
  let subject = template.subject;

  for (const [key, value] of Object.entries(values)) {
    const placeholder = `{{${key}}}`;
    body = body.split(placeholder).join(value);
    if (subject) {
      subject = subject.split(placeholder).join(value);
    }
  }

  return { subject, body };
}
