export interface BlogPost {
  id: number;
  title: string;
  author: string;
  image: string;
  date: string;
  views: number;
  comments: number;
  excerpt: string;
  body: string[];
}

// ponytail: static content, no backend. Swap for DB/CMS when posts are managed live.
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Nothing Beats The Magic Of Watching The Monsoon Rain With A Plate Of Piping Hot, Crispy Bhajiya.",
    author: "Aarav Sharma",
    image: "/images/Blogs/blog-poster.webp",
    date: "10 July 2026",
    views: 100,
    comments: 50,
    excerpt:
      "Rainy afternoons call for the best bhajiya in Nagpur: hot, crispy onion bhajiya served fresh at every Pohewala outlet. Here's why this monsoon ritual is unbeatable.",
    body: [
      "There is a sound that every Nagpur local knows by heart — the hiss of onion bhajiya being dropped into hot oil just as the first monsoon drops hit the tin roof. It is the city's unofficial rain anthem.",
      "At Pohewala, India's first poha QSR chain, we keep the ritual alive. Our bhajiya is sliced thick, battered thin, and fried to a crackle that survives the 40-minute wait between first bite and last — no soggy shortcuts, no reheated batches.",
      "When you search for the best bhajiya in Nagpur, the answer is simple: the one made fresh in front of you. Pair it with a cutting chai from our beverage menu and watch the rain do its thing.",
      "Some things don't need improving — they just need someone to keep doing them right. That's the whole Pohewala menu philosophy.",
    ],
  },
  {
    id: 2,
    title: "Why Tarri Poha Is Nagpur's True Breakfast Icon And How We Make It Fresh Every Morning.",
    author: "Ananya Deshmukh",
    image: "/images/Blogs/blog-poster.webp",
    date: "22 June 2026",
    views: 87,
    comments: 34,
    excerpt:
      "Spicy black chana tarri poured over steamed poha — widely rated the best poha in Nagpur. A look at how our tarri poha recipe is built fresh, daily.",
    body: [
      "Tarri poha is not a dish, it's a morning institution — and it's the reason Nagpur is known as the best poha city in India. The tarri, a slow-simmered black chana gravy, is the soul; the poha is the body; the sev and onion on top are the crown.",
      "Our cooks start the tarri before sunrise. Twelve spices, one night's soak, two hours of patient stirring until the oil separates and the aroma fills the outlet. It's the same tarri poha recipe every single morning, never rushed, never made ahead.",
      "Few things compare for breakfast in Nagpur. It's the same recipe that makes a 40-rupee plate feel like a homecoming — and why locals rate Pohewala among the best poha places in Nagpur.",
      "Freshness is the only secret, and it's not much of a secret at all. We just refuse to skip the step everyone else skips.",
    ],
  },
  {
    id: 3,
    title: "From Cutting Chai To Cold Coffee: The Story Behind Every Sip We Serve At Our Outlets.",
    author: "Aarav Sharma",
    image: "/images/Blogs/blog-poster.webp",
    date: "5 May 2026",
    views: 64,
    comments: 21,
    excerpt:
      "From the best cutting chai in Nagpur to a thick, drowsy cold coffee — the story behind both ends of the Pohewala beverage menu.",
    body: [
      "Chai is the heartbeat of any Pohewala outlet. Our cutting chai is a strong ginger-chai cut with milk, served in the small glass that never lets the last sip escape you — the closest thing Nagpur has to a handshake between strangers.",
      "It's why locals searching for the best chai in Nagpur keep landing back at our counter. Strong, honest, and poured the same way every single time.",
      "At the other end of the day sits our cold coffee — thick, chilled, and whipped with a cocoa finish that turns a hot Nagpur afternoon into a small treat.",
      "Between the two, we've learned what Nagpur drinks: strong in the morning, cold by afternoon, and always honest. Every cup on the Pohewala menu is made the way we'd serve it to ourselves.",
    ],
  },
  {
    id: 4,
    title: "From A Family Recipe To A Poha Franchise: How Pohewala Is Taking Nagpur's Breakfast National.",
    author: "Aarav Sharma",
    image: "/images/Blogs/blog-poster.webp",
    date: "28 August 2026",
    views: 143,
    comments: 61,
    excerpt:
      "How a humble Nagpur recipe became India's first poha QSR chain — and what it means for anyone exploring a profitable poha franchise in India.",
    body: [
      "Every famous brand starts as one plate someone refused to stop making. Pohewala began the same way — a family tarri poha recipe, a small counter in Nagpur, and the stubborn belief that the best poha in Nagpur deserved to be served beyond one city.",
      "That belief is what turned us into India's first poha QSR chain, and it's also what draws entrepreneurs to explore a poha franchise in India. Poha is fast to serve, affordable to stock, and loved across the country — the economics of a breakfast business are already on your side.",
      "Our poha franchise model was built to keep it simple: a tested menu, a proven supply chain, and a brand that doesn't ask you to reinvent breakfast, just to serve it well.",
      "If you've ever wondered how to start a poha franchise, the answer is the same one our founders gave — start with the freshest tarri, keep the recipe honest, and let the city find you.",
    ],
  },
];