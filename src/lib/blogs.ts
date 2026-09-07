export interface BlogPost {
  id: number;
  title: string;
  author: string;
  avatar: string;
  image: string;
  date: string;
  views: number;
  comments: number;
  excerpt: string;
  body: string[];
}

// ponytail: static content, no backend. Swap for DB/CMS when posts are managed live.
// Body paragraphs are placeholders — replace with real copy when available.
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Nothing Beats The Magic Of Watching The Monsoon Rain With A Plate Of Piping Hot, Crispy Bhajiya.",
    author: "John Wilson",
    avatar: "/images/Blogs/blog-avatar1.webp",
    image: "/images/Blogs/blog-poster.webp",
    date: "10 July 2026",
    views: 100,
    comments: 50,
    excerpt:
      "Rainy afternoons in Nagpur call for one thing: a plate of hot, crispy bhajiya. Here's why this monsoon ritual is unbeatable.",
    body: [
      "There is a sound that every Nagpur local knows by heart — the hiss of bhajiya being dropped into hot oil just as the first monsoon drops hit the tin roof. It is the city's unofficial rain anthem.",
      "At Pohewala, we keep the ritual alive. Onion bhajiya, sliced thick, battered thin, and fried to a crackle that survives the 40-minute wait between first bite and last.",
      "Pair it with a cutting chai and watch the rain do its thing. Some things don't need improving — they just need someone to keep doing them right.",
    ],
  },
  {
    id: 2,
    title: "Why Tarri Poha Is Nagpur's True Breakfast Icon And How We Make It Fresh Every Morning.",
    author: "John Wilson",
    avatar: "/images/Blogs/blog-avatar2.webp",
    image: "/images/Blogs/blog-avatar1.webp",
    date: "22 June 2026",
    views: 87,
    comments: 34,
    excerpt:
      "Spicy black chana tarri poured over steamed poha — the breakfast that defines a city. A look at how we build it fresh, daily.",
    body: [
      "Tarri poha is not a dish, it's a morning institution. The tarri — a slow-simmered black chana gravy — is the soul; the poha is the body; the sev and onion on top are the crown.",
      "Our cooks start the tarri before sunrise. Twelve spices, one night's soak, two hours of patient stirring until the oil separates and the aroma fills the outlet.",
      "It's the same recipe that makes a 40-rupee plate feel like a homecoming. Freshness is the only secret, and it's not much of a secret at all.",
    ],
  },
  {
    id: 3,
    title: "From Cutting Chai To Cold Coffee: The Story Behind Every Sip We Serve At Our Outlets.",
    author: "John Wilson",
    avatar: "/images/Blogs/blog-avatar1.webp",
    image: "/images/Blogs/blog-avatar2.webp",
    date: "5 May 2026",
    views: 64,
    comments: 21,
    excerpt:
      "The beverage menu runs from the classic cutting chai to a thick, drowsy cold coffee. Here's the story behind both ends of the cup.",
    body: [
      "Chai is the heartbeat of any Pohewala outlet. Our cutting chai is a strong ginger-chai cut with milk, served in the small glass that never lets the last sip escape you.",
      "At the other end of the day sits our cold coffee — thick, chilled, and whipped with a cocoa finish that turns a hot Nagpur afternoon into a small treat.",
      "Between the two, we've learned what Nagpur drinks: strong in the morning, cold by afternoon, and always honest. Every cup is made the way we'd serve it to ourselves.",
    ],
  },
];