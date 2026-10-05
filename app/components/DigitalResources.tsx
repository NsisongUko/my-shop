import Link from 'next/link';
import { FileText, GraduationCap, BookOpen, Layout } from 'lucide-react';

const resources = [
  {
    icon: Layout,
    title: 'Templates',
    description: 'Notion, Figma, and Jira templates ready to use.',
    href: '/shop?type=template',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: GraduationCap,
    title: 'Courses',
    description: 'Self-paced courses to level up your career.',
    href: '/courses',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: BookOpen,
    title: 'Ebooks',
    description: 'In-depth guides written by industry experts.',
    href: '/shop?type=book',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: FileText,
    title: 'Toolkits',
    description: 'Everything you need to do the job well.',
    href: '/shop?type=digital',
    color: 'from-pink-500 to-pink-600',
  },
];

export default function DigitalResources() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Digital Resources
        </h2>
        <p className="text-slate-500 mt-2">
          Downloadable and instantly accessible. Buy once, use forever.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((r) => {
          const Icon = r.icon;
          return (
            <Link
              key={r.title}
              href={r.href}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition p-6"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{r.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{r.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}