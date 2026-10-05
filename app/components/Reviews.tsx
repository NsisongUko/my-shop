const reviews = [
  {
    name: 'Amara O.',
    role: 'Product Manager',
    rating: 5,
    text: 'Incredibly practical. I used it the same week I bought it and got two interview offers.',
    date: '2 weeks ago',
  },
  {
    name: 'Tunde A.',
    role: 'Senior PM',
    rating: 5,
    text: 'Best resource I\'ve bought this year. Well-organized and actually useful.',
    date: '1 month ago',
  },
  {
    name: 'Chidi N.',
    role: 'Aspiring PM',
    rating: 4,
    text: 'Great value. Would love more case studies, but overall excellent.',
    date: '2 months ago',
  },
];

export default function Reviews({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <section className="mt-16">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5 text-orange-500">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <span className="font-bold text-slate-800">{rating}</span>
            <span className="text-slate-500 text-sm">· {reviewCount} reviews</span>
          </div>
        </div>
        <button className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-semibold px-5 py-2 rounded-full transition text-sm">
          Write a review
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 text-white font-bold flex items-center justify-center shrink-0">
                {r.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-bold text-slate-800">{r.name}</p>
                  <p className="text-slate-500 text-xs">{r.role}</p>
                  <span className="text-slate-300">·</span>
                  <p className="text-slate-400 text-xs">{r.date}</p>
                </div>
                <div className="flex items-center gap-0.5 text-orange-500 mt-1 text-sm">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-slate-700 mt-3">{r.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}