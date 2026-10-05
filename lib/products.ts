export type ProductType = 'book' | 'course' | 'template' | 'digital' | 'physical';

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;          // in Naira
  image: string;          // emoji for now, real image later
  category: string;       // 'pm' | 'design' | 'dev' | 'qa' | 'career' | 'courses'
  type: ProductType;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  badge?: string;         // "Best Seller", "New", etc.
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'pm-interview-starter-kit',
    name: 'PM Interview Starter Kit',
    shortDescription: 'Prepare confidently for your next PM interview.',
    longDescription: 'A complete kit with 100+ practice questions, answer frameworks, real case studies, and product exercises to help you land your next PM role.',
    price: 15000,
    image: '🎯',
    category: 'pm',
    type: 'digital',
    rating: 4.8,
    reviewCount: 24,
    isFeatured: true,
    badge: 'Best Seller',
  },
  {
    id: '2',
    slug: 'product-roadmap-template',
    name: 'Product Roadmap Template',
    shortDescription: 'A Notion template for planning your product roadmap.',
    longDescription: 'Fully customizable Notion template with quarterly planning, prioritization frameworks, and stakeholder views.',
    price: 7500,
    image: '🗺️',
    category: 'pm',
    type: 'template',
    rating: 4.6,
    reviewCount: 18,
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'ux-research-handbook',
    name: 'UX Research Handbook',
    shortDescription: 'Learn user research from scratch.',
    longDescription: 'A practical guide covering interviews, usability testing, surveys, synthesis, and reporting insights to stakeholders.',
    price: 12000,
    image: '🎨',
    category: 'design',
    type: 'book',
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    badge: 'New',
  },
  {
    id: '4',
    slug: 'figma-design-system-starter',
    name: 'Figma Design System Starter',
    shortDescription: 'Jumpstart your design system in Figma.',
    longDescription: 'A complete Figma file with tokens, components, and documentation templates to launch a design system in days, not months.',
    price: 9500,
    image: '🎨',
    category: 'design',
    type: 'template',
    rating: 4.7,
    reviewCount: 31,
    isFeatured: true,
  },
  {
    id: '5',
    slug: 'developer-career-kit',
    name: 'Developer Career Kit',
    shortDescription: 'Land your next developer role with confidence.',
    longDescription: 'Resume templates, portfolio checklists, coding interview prep, and negotiation guides specifically for developers.',
    price: 13000,
    image: '💻',
    category: 'dev',
    type: 'digital',
    rating: 4.8,
    reviewCount: 37,
    isFeatured: true,
  },
  {
    id: '6',
    slug: 'git-github-guide',
    name: 'Git & GitHub Mastery Guide',
    shortDescription: 'From beginner to confident Git user.',
    longDescription: 'Clear explanations, real workflows, and exercises to master Git and GitHub for collaborative development.',
    price: 6000,
    image: '💻',
    category: 'dev',
    type: 'book',
    rating: 4.5,
    reviewCount: 22,
    isFeatured: false,
  },
  {
    id: '7',
    slug: 'qa-test-case-templates',
    name: 'QA Test Case Templates',
    shortDescription: 'Ready-to-use test case templates for QA teams.',
    longDescription: 'A pack of templates covering functional, regression, exploratory, and UAT testing across web and mobile apps.',
    price: 5000,
    image: '🧪',
    category: 'qa',
    type: 'template',
    rating: 4.6,
    reviewCount: 15,
    isFeatured: true,
  },
  {
    id: '8',
    slug: 'qa-interview-kit',
    name: 'QA Interview Kit',
    shortDescription: 'Ace your QA interviews.',
    longDescription: 'A comprehensive set of QA interview questions, testing scenarios, and automation exercises with answers.',
    price: 11000,
    image: '🧪',
    category: 'qa',
    type: 'digital',
    rating: 4.7,
    reviewCount: 19,
    isFeatured: false,
  },
  {
    id: '9',
    slug: 'cv-template-pack',
    name: 'Tech CV Template Pack',
    shortDescription: '5 ATS-friendly CV templates for tech roles.',
    longDescription: 'Professionally designed CV templates optimized for applicant tracking systems. Works for PM, design, dev, and QA roles.',
    price: 4500,
    image: '📄',
    category: 'career',
    type: 'template',
    rating: 4.9,
    reviewCount: 58,
    isFeatured: true,
    badge: 'Popular',
  },
  {
    id: '10',
    slug: 'linkedin-optimization-guide',
    name: 'LinkedIn Optimization Guide',
    shortDescription: 'Turn your LinkedIn into a career magnet.',
    longDescription: 'Step-by-step guide with templates and examples to optimize your profile, headline, and content strategy.',
    price: 3500,
    image: '🔗',
    category: 'career',
    type: 'digital',
    rating: 4.8,
    reviewCount: 41,
    isFeatured: true,
  },
  {
    id: '11',
    slug: 'product-management-starter-course',
    name: 'Product Management Starter Course',
    shortDescription: 'Learn the fundamentals of product management.',
    longDescription: 'A self-paced course covering discovery, research, prioritization, roadmapping, PRDs, and working with engineers.',
    price: 35000,
    image: '🎓',
    category: 'courses',
    type: 'course',
    rating: 4.9,
    reviewCount: 63,
    isFeatured: true,
    badge: 'Top Rated',
  },
  {
    id: '12',
    slug: 'ux-design-foundations-course',
    name: 'UX Design Foundations Course',
    shortDescription: 'Design your first product end-to-end.',
    longDescription: 'Learn UX principles, wireframing, prototyping, and design handoff through a real-world project.',
    price: 40000,
    image: '🎓',
    category: 'courses',
    type: 'course',
    rating: 4.8,
    reviewCount: 47,
    isFeatured: true,
  },
];

export const categories = [
  { slug: 'pm', name: 'Product Management', emoji: '🎯', description: 'Books, templates, and courses for PMs.' },
  { slug: 'design', name: 'Product Design', emoji: '🎨', description: 'Design resources for UX/UI professionals.' },
  { slug: 'dev', name: 'Development', emoji: '💻', description: 'Resources for developers at every level.' },
  { slug: 'qa', name: 'QA & Testing', emoji: '🧪', description: 'Testing templates and interview prep.' },
  { slug: 'career', name: 'Career Development', emoji: '📈', description: 'CV templates, interview kits, and guides.' },
  { slug: 'courses', name: 'Courses', emoji: '🎓', description: 'Self-paced courses for product professionals.' },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured);
}

export function formatPrice(naira: number) {
  return `₦${naira.toLocaleString()}`;
}