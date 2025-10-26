
export interface Realtor {
  id: string;
  name: string;
  type: 'individual' | 'firm';
  location: string;
  city: string;
  specialty: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  credentials: string[];
  yearsExperience: number;
  photoUrl?: string;
  initials: string;
  services?: string[];
}

export const realtors: Realtor[] = [
  {
    id: 'mcmullan-realty',
    name: 'McMullan Realty',
    type: 'firm',
    location: 'Cleveland, OH',
    city: 'Cleveland',
    specialty: 'Senior Housing & Downsizing',
    description: `McMullan Realty has been a trusted name in Cleveland real estate for over two decades, specializing in helping seniors find their perfect next home. Our compassionate approach recognizes that moving in later life is both a practical decision and an emotional journey. We take time to understand each client's unique needs, whether they're downsizing from a family home, seeking accessible features, or looking for vibrant senior communities.

Our team understands the Northeast Ohio market intimately, from quiet suburban neighborhoods perfect for peaceful retirement to active senior communities with amenities and social opportunities. We provide comprehensive support throughout the entire process, working closely with families and connecting clients with trusted resources for everything from moving services to estate planning referrals.

What sets us apart is our commitment to dignity and respect in every interaction. We never rush decisions, always advocate for our clients' best interests, and ensure that every senior we work with feels heard, valued, and confident in their housing choices.`,
    phone: '(216) 555-0142',
    email: 'info@mcmullanrealty.com',
    website: 'https://mcmullanrealty.com',
    credentials: ['Certified Seniors Real Estate Specialist (SRES)', 'Ohio Licensed Real Estate Broker', 'Better Business Bureau A+ Rating'],
    yearsExperience: 22,
    initials: 'MR'
  },
  {
    id: 'james-washington',
    name: 'James Washington',
    type: 'individual',
    location: 'Akron, OH',
    city: 'Akron',
    specialty: 'First-Time Senior Buyers',
    description: `James Washington brings a unique perspective to senior housing, having transitioned from a career in social work to real estate fifteen years ago. His background gives him exceptional insight into the emotional and practical challenges seniors face when making housing decisions. James specializes in working with first-time senior buyers who are navigating retirement housing options for the very first time.

His patient, educational approach helps clients understand every aspect of the home-buying process, from financing options specifically available to seniors to understanding the pros and cons of different types of senior housing. James is particularly skilled at helping seniors evaluate whether independent living communities, condominiums, or traditional homes best fit their lifestyle and future needs.

Clients consistently praise James for his honesty, accessibility, and genuine care for their wellbeing. He maintains long-term relationships with clients, often checking in years after a purchase to ensure they're still happy with their choice and helping them navigate any changes in their housing needs.`,
    phone: '(330) 555-0198',
    email: 'james@washingtonrealty.com',
    website: 'https://washingtonrealty.com',
    credentials: ['Seniors Real Estate Specialist (SRES)', 'Certified Residential Specialist (CRS)', 'Ohio Licensed Realtor'],
    yearsExperience: 15,
    initials: 'JW'
  },
  {
    id: 'diana-brooks',
    name: 'Diana Brooks',
    type: 'individual',
    location: 'Shaker Heights, OH',
    city: 'Shaker Heights',
    specialty: 'Luxury Senior Living',
    description: `Diana Brooks has established herself as the premier realtor for luxury senior living in the Greater Cleveland area. With eighteen years of experience, she specializes in high-end condominiums, luxury senior communities, and estate properties perfect for affluent seniors who refuse to compromise on quality and comfort in their retirement years.

Diana's expertise extends beyond traditional real estate to understanding the unique amenities and services that matter most to discerning senior clients: concierge services, fine dining options, cultural programming, wellness facilities, and proximity to healthcare and cultural attractions. She has deep relationships with the area's most prestigious senior communities and stays current on new developments and exclusive opportunities.

Her white-glove service includes coordinating with interior designers, estate sale companies, and luxury moving services to ensure a seamless transition. Diana's clients appreciate her discretion, attention to detail, and ability to anticipate needs before they arise. She understands that for many of her clients, this may be their final home purchase, and she ensures it exceeds every expectation.`,
    phone: '(216) 555-0276',
    email: 'diana@brooksfinehomes.com',
    website: 'https://brooksfinehomes.com',
    credentials: ['Certified Luxury Home Marketing Specialist', 'Seniors Real Estate Specialist (SRES)', 'Million Dollar Club Member'],
    yearsExperience: 18,
    initials: 'DB'
  },
  {
    id: 'marcus-coleman',
    name: 'Marcus Coleman',
    type: 'individual',
    location: 'Euclid, OH',
    city: 'Euclid',
    specialty: 'Accessible Housing',
    description: `Marcus Coleman's journey into accessible housing began when he helped his own grandmother find a home that could accommodate her mobility needs. That personal experience ignited a passion that has defined his twelve-year real estate career. Marcus has become the go-to realtor for seniors and their families who need homes with specific accessibility features or the potential for accessibility modifications.

His expertise includes identifying homes with single-floor living, accessible bathrooms, ramp-friendly entrances, and proximity to medical facilities and public transportation. Marcus also maintains a network of trusted contractors who specialize in aging-in-place modifications, helping clients envision how a property could be adapted to meet changing needs over time.

What makes Marcus special is his proactive approach to accessibility planning. He doesn't just find homes that meet current needs; he helps clients think about future needs and ensures their housing choice can evolve with them. His compassionate, practical approach has helped hundreds of seniors maintain their independence and dignity in homes perfectly suited to their abilities.`,
    phone: '(216) 555-0355',
    email: 'marcus@accessiblehomesohio.com',
    website: 'https://accessiblehomesohio.com',
    credentials: ['Certified Aging-in-Place Specialist (CAPS)', 'Seniors Real Estate Specialist (SRES)', 'Ohio Association of Realtors'],
    yearsExperience: 12,
    initials: 'MC'
  },
  {
    id: 'patricia-johnson',
    name: 'Patricia Johnson',
    type: 'individual',
    location: 'Lakewood, OH',
    city: 'Lakewood',
    specialty: 'Estate Transitions',
    description: `Patricia Johnson combines her background in estate planning law with real estate expertise to provide comprehensive estate transition services for senior clients and their families. With twenty years of experience, she specializes in helping seniors navigate the complex intersection of real estate decisions and estate planning, ensuring that housing choices align with broader financial and legacy goals.

Patricia is uniquely qualified to help seniors understand how downsizing decisions affect estate taxes, Medicaid planning, and inheritance strategies. She works closely with estate planning attorneys, financial advisors, and tax professionals to ensure that real estate transactions support rather than complicate overall estate plans. Her approach is particularly valuable for seniors with significant assets or complex family situations.

Her services extend beyond the transaction to include guidance on timing sales to optimize tax implications, structuring purchases to protect assets, and coordinating with family members to ensure everyone understands and supports the housing transition. Patricia's clients value her ability to see the big picture and provide counsel that goes far beyond finding the right property.`,
    phone: '(216) 555-0433',
    email: 'patricia@estatehousinglaw.com',
    website: 'https://estatehousinglaw.com',
    credentials: ['J.D. Estate Planning Law', 'Seniors Real Estate Specialist (SRES)', 'Certified Estate Planning Specialist'],
    yearsExperience: 20,
    initials: 'PJ'
  },
  {
    id: 'robert-davis',
    name: 'Robert Davis',
    type: 'individual',
    location: 'Cleveland Heights, OH',
    city: 'Cleveland Heights',
    specialty: 'Community Living',
    description: `Robert Davis has dedicated his fourteen-year real estate career to helping seniors find vibrant community living options throughout Northeast Ohio. His specialty lies in active adult communities, senior co-housing arrangements, and neighborhoods with strong social networks that combat isolation and promote active, engaged living in retirement years.

Robert's approach recognizes that housing is about much more than four walls and a roof—it's about finding a place where seniors can build meaningful relationships, pursue interests, and maintain active, purposeful lives. He maintains detailed knowledge about community programming, social opportunities, volunteer options, and recreational facilities in different neighborhoods and senior communities throughout the region.

His clients appreciate Robert's genuine enthusiasm for helping them find not just a house, but a home where they can thrive socially and emotionally. He often arranges for clients to meet current residents, attend community events, or volunteer in neighborhoods they're considering. Robert's goal is ensuring that every client finds a living situation that enriches rather than limits their retirement experience.`,
    phone: '(216) 555-0511',
    email: 'robert@communityliving.com',
    website: 'https://communityliving.com',
    credentials: ['Senior Housing Counselor Certification', 'Seniors Real Estate Specialist (SRES)', 'Community Development Specialist'],
    yearsExperience: 14,
    initials: 'RD'
  }
];

export function getRealtorBySlug(slug: string): Realtor | undefined {
  return realtors.find(realtor => realtor.id === slug);
}

export function getRealtorsByCity(city: string): Realtor[] {
  return realtors.filter(realtor => 
    realtor.city.toLowerCase() === city.toLowerCase()
  );
}

export function searchRealtors(query: string): Realtor[] {
  const searchTerm = query.toLowerCase();
  return realtors.filter(realtor => 
    realtor.name.toLowerCase().includes(searchTerm) ||
    realtor.location.toLowerCase().includes(searchTerm) ||
    realtor.specialty.toLowerCase().includes(searchTerm)
  );
}
