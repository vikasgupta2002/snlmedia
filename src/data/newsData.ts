
export interface NewsItem {
  id: number;
  title: string;
  image: string;
  category?: string;
  timestamp: string;
  summary?: string;
}

export const nationalNews: NewsItem[] = [
  {
    id: 201,
    title: "PM announces nationwide infrastructure development project",
    image: "https://picsum.photos/id/91/800/450",
    category: "National",
    timestamp: "1 hour ago",
    summary: "The Prime Minister today announced a major infrastructure initiative that will span across all states and union territories."
  },
  {
    id: 202,
    title: "Supreme Court issues landmark judgment on privacy rights",
    image: "https://picsum.photos/id/43/800/450",
    category: "National",
    timestamp: "3 hours ago",
    summary: "In a significant ruling, the Supreme Court has upheld citizens' right to privacy in digital communications."
  },
  {
    id: 203,
    title: "Education Ministry rolls out new National Education Policy implementation guidelines",
    image: "https://picsum.photos/id/20/800/450",
    category: "National",
    timestamp: "Yesterday",
    summary: "The Ministry of Education has released detailed guidelines for the implementation of the new National Education Policy."
  },
  {
    id: 204,
    title: "Parliament passes new bill to reform agricultural sector",
    image: "https://picsum.photos/id/60/800/450",
    category: "National",
    timestamp: "Yesterday",
    summary: "After extensive debate, the Parliament has passed a new bill aimed at reforming the agricultural sector and improving farmers' welfare."
  }
];

export const internationalNews: NewsItem[] = [
  {
    id: 301,
    title: "Global climate summit concludes with new emissions agreement",
    image: "https://picsum.photos/id/90/800/450",
    category: "International",
    timestamp: "2 hours ago",
    summary: "The international climate summit has concluded with a new agreement on reducing carbon emissions over the next decade."
  },
  {
    id: 302,
    title: "Major trade deal signed between Asian economic powers",
    image: "https://picsum.photos/id/28/800/450",
    category: "International",
    timestamp: "4 hours ago",
    summary: "Several Asian nations have signed a comprehensive trade agreement that is expected to boost regional economic growth."
  },
  {
    id: 303,
    title: "UN peacekeeping mission extended in conflict-affected region",
    image: "https://picsum.photos/id/36/800/450",
    category: "International",
    timestamp: "Yesterday",
    summary: "The United Nations Security Council has voted to extend the peacekeeping mission in a conflict-affected region for another year."
  },
  {
    id: 304,
    title: "European Union introduces new digital market regulations",
    image: "https://picsum.photos/id/75/800/450",
    category: "International",
    timestamp: "2 days ago",
    summary: "The European Union has introduced new regulations aimed at creating a more competitive digital marketplace."
  }
];

export const sportsNews: NewsItem[] = [
  {
    id: 401,
    title: "National cricket team wins series against top-ranked opponent",
    image: "https://picsum.photos/id/21/800/450",
    category: "Sports",
    timestamp: "3 hours ago",
    summary: "In a thrilling final match, the national cricket team secured a series victory against the top-ranked team in the world."
  },
  {
    id: 402,
    title: "Star athlete breaks Olympic record in qualifying event",
    image: "https://picsum.photos/id/26/800/450",
    category: "Sports",
    timestamp: "5 hours ago",
    summary: "A national athlete has broken the Olympic record during a qualifying event, raising hopes for a gold medal at the upcoming Games."
  },
  {
    id: 403,
    title: "Football league announces expansion with two new teams",
    image: "https://picsum.photos/id/47/800/450",
    category: "Sports",
    timestamp: "Yesterday",
    summary: "The national football league has announced its expansion with the addition of two new teams starting from the next season."
  },
  {
    id: 404,
    title: "Badminton championship sees upset as underdog wins title",
    image: "https://picsum.photos/id/49/800/450",
    category: "Sports",
    timestamp: "Yesterday",
    summary: "In a stunning turn of events, an underdog player has claimed the national badminton championship title, defeating several top-ranked players."
  }
];

export const entertainmentNews: NewsItem[] = [
  {
    id: 501,
    title: "Blockbuster movie breaks box office records in first weekend",
    image: "https://picsum.photos/id/17/800/450",
    category: "Entertainment",
    timestamp: "2 hours ago",
    summary: "A highly anticipated blockbuster film has shattered box office records during its opening weekend."
  },
  {
    id: 502,
    title: "Popular music artist announces world tour with multiple stops in India",
    image: "https://picsum.photos/id/24/800/450",
    category: "Entertainment",
    timestamp: "6 hours ago",
    summary: "A globally renowned music artist has announced a world tour that includes multiple performances across major Indian cities."
  },
  {
    id: 503,
    title: "Streaming platform acquires rights to critically acclaimed series",
    image: "https://picsum.photos/id/37/800/450",
    category: "Entertainment",
    timestamp: "Yesterday",
    summary: "A major streaming platform has acquired the rights to a critically acclaimed series, making it available to Indian audiences."
  },
  {
    id: 504,
    title: "Annual film awards ceremony honors best in cinema",
    image: "https://picsum.photos/id/96/800/450",
    category: "Entertainment",
    timestamp: "3 days ago",
    summary: "The annual film awards ceremony was held last night, honoring outstanding achievements in cinema from the past year."
  }
];

export const businessNews: NewsItem[] = [
  {
    id: 601,
    title: "Stock market reaches all-time high amid economic recovery",
    image: "https://picsum.photos/id/48/800/450",
    category: "Business",
    timestamp: "1 hour ago",
    summary: "The national stock market index has reached an all-time high as economic recovery continues to exceed expectations."
  },
  {
    id: 602,
    title: "Major tech company announces investment in Indian startups",
    image: "https://picsum.photos/id/54/800/450",
    category: "Business",
    timestamp: "4 hours ago",
    summary: "A leading global technology company has announced a significant investment fund dedicated to supporting Indian startups."
  },
  {
    id: 603,
    title: "Central bank maintains interest rates amid inflation concerns",
    image: "https://picsum.photos/id/63/800/450",
    category: "Business",
    timestamp: "Yesterday",
    summary: "The central bank has decided to maintain current interest rates while acknowledging growing concerns about inflation."
  },
  {
    id: 604,
    title: "E-commerce giant expands operations with new fulfillment centers",
    image: "https://picsum.photos/id/69/800/450",
    category: "Business",
    timestamp: "2 days ago",
    summary: "A major e-commerce company is expanding its operations by opening several new fulfillment centers across the country."
  }
];

export const technologyNews: NewsItem[] = [
  {
    id: 701,
    title: "Tech giant unveils next-generation smartphone with AI capabilities",
    image: "https://picsum.photos/id/64/800/450",
    category: "Technology",
    timestamp: "3 hours ago",
    summary: "A leading technology company has unveiled its next-generation smartphone featuring advanced artificial intelligence capabilities."
  },
  {
    id: 702,
    title: "Indian space agency successfully launches satellite for telecommunications",
    image: "https://picsum.photos/id/39/800/450",
    category: "Technology",
    timestamp: "5 hours ago",
    summary: "The national space agency has successfully launched a new satellite that will enhance telecommunications services across the country."
  },
  {
    id: 703,
    title: "Research institute develops new renewable energy technology",
    image: "https://picsum.photos/id/84/800/450",
    category: "Technology",
    timestamp: "Yesterday",
    summary: "A prestigious research institute has announced the development of a breakthrough technology in renewable energy generation."
  },
  {
    id: 704,
    title: "Government introduces new cybersecurity framework for critical infrastructure",
    image: "https://picsum.photos/id/42/800/450",
    category: "Technology",
    timestamp: "2 days ago",
    summary: "The government has introduced a new comprehensive cybersecurity framework designed to protect critical national infrastructure."
  }
];
