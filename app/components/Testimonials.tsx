const testimonials = [
  {
    name: 'Amara O.',
    role: 'Product Manager',
    text: 'The PM Interview Kit helped me land a role at a top fintech. Worth every naira.',
    initials: 'AO',
    color: 'bg-purple-600',
  },
  {
    name: 'Tunde A.',
    role: 'Product Designer',
    text: 'The Figma Design System Starter saved me weeks of setup. Clean, well-documented.',
    initials: 'TA',
    color: 'bg-orange-500',
  },
  {
    name: 'Chidi N.',
    role: 'Software Engineer',
    text: "The Developer Career Kit gave me a clear roadmap. I got two offers in a month.",
    initials: 'CN',
    color: 'bg-blue-600',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Loved by product people
          </h2>
          <p className="text-slate-500 mt-2">
            Real feedback from professionals who&apos;ve used our resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
            >
              <div className="flex items-center gap-1 text-orange-500 mb-3">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-slate-700 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} text-white font-bold flex items-center justify-center`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}