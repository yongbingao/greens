# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Company.destroy_all
Transaction.destroy_all

user1 = User.create(username: "Demo", email: "demo@demo.com", password:"longpassword", current_buying_power: 500000)
user2 = User.create(username: "admin", email: "admin@admin.com", password:"longpassword", current_buying_power: 100000)
user3 = User.create(username: "ben", email: "ben@gmail.com", password:"longpassword", current_buying_power: 50000)

company1 = Company.create(
    ticker: "GOOG",
    name: "Alphabet, Inc.",
    ceo: "Lawrence E. Page",
    market_cap: 767.11,
    employees: 98771,
    about: "Alphabet, Inc. is a holding company, which engages in the business of acquisition and operation of different companies. It operates through the Google and Other Bets segments. The Google segment includes its main Internet products such as Ads, Android, Chrome, Commerce, Google Cloud, Google Maps, Google Play, Hardware, Search, and YouTube. The Other Bets segment includes businesses such as Access, Calico, CapitalG, GV, Nest, Verily, Waymo, and X. The company was founded by Lawrence E. Page and Sergey Mikhaylovich Brin on October 2, 2015 and is headquartered in Mountain View, CA.",
    founded: 2015,
    headquarter: "Mountain View, CA",
    pe_ratio: 26.53,
    avg_volume: 1579481)

company2 = Company.create(
    ticker: "AAPL",
    name: "Apple, Inc.",
    ceo: "Timothy Donald Cook",
    market_cap: 805.51,
    employees: 132000,
    dividend: 1.76, 
    about: "Apple, Inc. engages in the design, manufacture, and marketing of mobile communication, media devices, personal computers, and portable digital music players. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak on April 1, 1976 and is headquartered in Cupertino, CA.",
    founded: 1976,
    headquarter: "Cupertino, CA",
    pe_ratio: 14.74,
    avg_volume: 27043584)

company3 = Company.create(
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    about: "Amazon.com, Inc. engages in the provision of online retail shopping services. It operates through the following business segments: North America, International, and Amazon Web Services (AWS). The North America segment includes retail sales of consumer products and subscriptions through North America-focused websites such as www.amazon.com and www.amazon.ca. The International segment offers retail sales of consumer products and subscriptions through internationally-focused websites. The Amazon Web Services segment involves in the global sales of compute, storage, database, and AWS service offerings for start-ups, enterprises, government agencies, and academic institutions. The company was founded by Jeffrey P. Bezos in July 1994 and is headquartered in Seattle, WA.",
    ceo: "Jeffrey P. Bezos",
    employees: 647500,
    founded: 1994,
    headquarter: "Seattle, WA",
    market_cap: 873.92,
    pe_ratio: 78.00,
    avg_volume: 4618819 )

company4 = Company.create(
    ticker: "MSFT",
    name: "Microsoft Corp.",
    about: "Microsoft Corp. engages in the development and support of software, services, devices, and solutions. Its products includes operating systems; cross-device productivity applications; server applications; business solution applications; desktop and server management tools; software development tools; and video games. It also offers personal computers, tablets, gaming and entertainment consoles, other intelligent devices, and related accessories. It operates through the following business segments: Productivity and Business Processes; Intelligent Cloud; and More Personal Computing. The Productivity and Business Processes segment is comprised of products and services in the portfolio of productivity, communication, and information services of the company spanning a variety of devices and platform. The Intelligent Cloud segment refers to the public, private, and hybrid serve products and cloud services of the company which can power modern business. The More Personal Computing segment encompasses the products and services such as windows operating system, devices, gaming platform, and search engines. The company was founded by William Henry Gates III in 1975 and is headquartered in Redmond, WA.",
    ceo: "Satya Nadella",
    employees: 131000,
    founded: 1975,
    headquarter: "Redmond, WA",
    market_cap: 947.74,
    dividend: 1.49, 
    pe_ratio: 28.70,
    avg_volume: 26646769)

company5 = Company.create(
    ticker: "NFLX",
    name: "Netflix, Inc.",
    about: "Netflix, Inc. is an Internet subscription service company, which provides subscription service streaming movies and television episodes over the Internet and sending DVDs by mail. It operates through the following segments: Domestic Streaming, International Streaming and Domestic DVD. The Domestic Streaming segment derives revenues from monthly membership fees for services consisting solely of streaming content to its members in the United States. The International Streaming segment includes fees from members outside the United States. The Domestic DVD segment covers revenues from services consisting solely of DVD-by-mail. The company was founded by Marc Randolph and Wilmot Reed Hastings Jr., on August 29, 1997 and is headquartered in Los Gatos, CA.",
    ceo: "Wilmot Reed Hastings",
    employees: 7100,
    founded: 1997,
    headquarter: "Los Gatos, CA",
    market_cap: 150.01,
    avg_volume: 5023449,
    pe_ratio: 122.60)

company7 = Company.create(
    ticker: "FB",
    name: "Facebook, Inc.",
    about: "Facebook, Inc. engages in the development of social media applications for people to connect through mobile devices, personal computers, and other surfaces. It enables users to share opinions, ideas, photos, videos, and other activities online. Its products include Facebook, Instagram, Messenger, WhatsApp, and Oculus. The company was founded by Mark Elliot Zuckerberg, Dustin Moskovitz, Chris R. Hughes, Andrew McCollum, and Eduardo P. Saverin on February 4, 2004 and is headquartered in Menlo Park, CA.",
    ceo: "Mark Elliot Zuckerberg",
    employees: 35587,
    founded: 2004,
    headquarter: "Menlo Park, CA",
    market_cap: 506.62,
    avg_volume: 15226536,
    pe_ratio: 22.82)

company8 = Company.create(
    ticker: "INTC",
    name: "Intel Corp.",
    about: "Intel Corp. engages in the design, manufacture, and sale of computer products and technologies. It delivers computer, networking, data storage and communications platforms. It operates its business through the following segments: Client Computing Group, Data Center Group, Internet of Things Group, Non-Volatile Memory Solutions Group, Programmable Solutions and All Other. The Client Computing Group segment consists of platforms designed for notebooks, 2 in 1 systems, desktops, tablets, phones, wireless and wired connectivity products, and mobile communication components. The Data Center Group segment includes workload-optimized platforms and related products designed for enterprise, cloud, and communication infrastructure market. The Internet of Things Group segment comprises of platforms such as retail, transportation, industrial, video, buildings and smart cities, along with a broad range of other market segments. The Non-Volatile Memory Solutions Group segment constitutes of NAND flash memory products primarily used in solid-state drives. The Programmable Solutions Group segment contains programmable semiconductors and related products for a broad range of markets, including communications, data center, industrial, military, and automotive. The All Other segment consists of results from other non-reportable segment and corporate-related charges. The company was founded by Robert Norton Noyce and Gordon Earle Moore on July 18, 1968 and is headquartered in Santa Clara, CA.",
    ceo: "Robert Holmes Swan",
    employees: 107400,
    founded: 1968,
    headquarter: "Santa Clara, CA",
    market_cap: 197.17,
    avg_volume: 25532529,
    pe_ratio: 10.20,
    dividend: 2.86)

company9 = Company.create(
    ticker: "JPM",
    name: "JPMorgan Chase & Co.",
    about: "JPMorgan Chase & Co. is a financial holding company, which provides financial and investment banking services. It offers a range of investment banking products and services in all capital markets, including advising on corporate strategy and structure; capital raising in equity and debt markets; sophisticated risk management; market making in cash securities and derivative instruments; and prime brokerage and research. It operates its business through the following segments: Consumer and Community Banking; Corporate and Investment Bank; Commercial Banking; and Asset and Wealth Management. The Consumer and Community Banking segment serves consumers and businesses through personal service at bank branches and through automated teller machine, online, mobile, and telephone banking. The Corporate and Investment Bank segment offers a suite of investment banking, market-making, prime brokerage, and treasury and securities products and services to a global client base of corporations, investors, financial institutions, government and municipal entities. The Commercial Banking segment delivers services to U.S. and its multinational clients, including corporations, municipalities, financial institutions, and non profit entities. It also provides financing to real estate investors and owners as well as financial solutions, including lending, treasury services, investment banking, and asset management. The Asset and Wealth Management segment provides asset and wealth management services. It offers investment management across all major asset services, including equities, fixed income, alternatives, and money market funds. The company was founded in 1968 and is headquartered in New York, NY.",
    ceo: "James Dimon",
    founded: 1968,
    headquarter: "New York, NY",
    employees: 256105,
    market_cap: 343.73,
    avg_volume: 10952857,
    pe_ratio: 11.47,
    dividend: 3.02 )
    
company10 = Company.create(
    ticker: "CLAR",
    name: "Clarus Corp.",
    about: "Clarus Corp. engages in development, manufacture, and distribution of outdoor equipment and lifestyle products focused on the climb, ski, mountain, and sport categories. It operates through the Black Diamond and Sierra segment. The Black Diamond segment designs, manufactures, and markets outdoor engineered equipment and apparel for climbing, mountaineering, backpacking, skiing, and a range of other year-round outdoor recreation activities. The Sierra segment produces a range of bullets for both rifles and pistols that are used for precision target shooting, hunting, and military and law enforcement purposes. The company was founded in 1989 and is headquartered in Salt Lake City, UT.",
    ceo: "-",
    employees: 500,
    founded: 1989,
    headquarter: "Salt Lake City, UT",
    market_cap: 0.38,
    avg_volume: 241205,
    pe_ratio: 35.20,
    dividend: 0.78 )

company12 = Company.create(
    ticker: "ORCL",
    name: "Oracle Corp.",
    about: "Oracle Corp. engages in the provision of products and services that address all aspects of corporate information technology environments. It operates through the following segments: Cloud and License, Hardware, and Services. The Cloud and License segment markets, sells, and delivers applications, platform, and infrastructure technologies. The Hardware segment provides hardware products and hardware-related software products including Oracle Engineered Systems, servers, storage, industry-specific hardware, operating systems, virtualization, management and other hardware related software, and related hardware support. The Services segment offers consulting, advanced support, and education services. The company was founded by Lawrence Joseph Ellison, Robert Nimrod Miner, and Edward A. Oates on June 16, 1977 and is headquartered in Redwood City, CA.",
    ceo: "Safra Ada Catz / Mark V. Hurd",
    employees: 137000,
    founded: 1977, 
    headquarter: "Redwood City, CA",
    market_cap: 172.93,
    avg_volume: 11847089,
    pe_ratio: 18.16,
    dividend: 1.90 )

company13 = Company.create(
    ticker: "TWTR",
    name: "Twitter, Inc.",
    about: "Twitter, Inc. is a global platform for public self-expression and conversation in real time. It provides a network that connects users to people, information, ideas, opinions, and news. The company's services include live commentary, live connections and live conversations. Its application provides social networking services and micro-blogging services through mobile devices and the Internet. The company can also be used as a marketing tool for businesses. Twitter was founded by Jack Dorsey, Christopher Isaac Stone, Noah E. Glass, Jeremy LaTrasse, and Evan Williams on March 21, 2006 and is headquartered in San Francisco, CA.",
    ceo: "Jack Dorsey",
    employees: 3920,
    founded: 2006, 
    headquarter: "San Francisco, CA",
    market_cap: 28.01,
    avg_volume: 8556067,
    pe_ratio: 42.43)

company14 = Company.create(
    ticker: "YELP",
    name: "Yelp, Inc.",
    about: "Yelp, Inc. hosts an online database of user-generated reviews of local businesses. It provides reviews on local businesses, which include restaurants, boutiques and salons, dentists, mechanics and plumbers. The firm offers multiple free and paid advertising solutions to engage with consumers, including free online business accounts, search advertising and Yelp Deals. The company was founded by Jeremy Stoppelman and Russell Simmons in July 2004 and is headquartered in San Francisco, CA.",
    ceo: "Jeremy Stoppelman",
    employees: 6030,
    founded: 2004,
    headquarter: "San Francisco, CA",
    market_cap: 2.38,
    avg_volume: 1793371,
    pe_ratio: 47.31)

company15 = Company.create(
    ticker: "TSLA",
    name: "Tesla, Inc.",
    about: "Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles, energy generation and storage systems. It also provides vehicle service centers, supercharger station, and self-driving capability. The company operates through Automotive, and Energy Generation and Storage segments. The Automotive segment includes the design, development, manufacture and sale of electric vehicles. The Energy Generation and Storage segment includes the design, manufacture, installation, sale, and lease of stationary energy storage products and solar energy systems, and sale of electricity generated by its solar energy systems to customers. The company was founded by Jeffrey B. Straubel, Elon Reeve Musk, Martin Eberhard, and Marc Tarpenning on July 1, 2003 and is headquartered in Palo Alto, CA.",
    ceo: "Elon Reeve Musk",
    employees: 48817,
    founded: 2003, 
    headquarter: "Palo Alto, CA",
    market_cap: 32.98, 
    avg_volume: 10406732)

company16 = Company.create(
    ticker: "X",
    name: "United States Steel Corp.",
    about: "United States Steel Corp. engages in the manufacturing and selling of steel products. It operates through the following business segments: Flat-Rolled Products, U.S. Steel Europe, and Tubular Products. The Flat-Rolled Products segment includes managing steel plants and production facilities that manufactures steel slabs, rounds, strip mill plates, sheets, tin mill, iron ore, and coke. The U.S. Steel Europe segment offers producing and marketsing strip mill plates, spiral welded pipe, heating radiators, refractory ceramic materials. The Tubular Products segment involves in manufacturing and trading seamless and electric resistance welded steel casing and tubing. line pipe, and mechanical tubing. The company was founded in 1901 by Andrew Carnegie, John Pierpont Morgan, Charles Michael Schwab and Elbert Henry Gary.",
    founded: 1901,
    headquarter: "Pittsburgh, PA",
    ceo: "David B. Burritt",
    employees: 29000,
    market_cap: 2.448,
    avg_volume: 6533416,
    pe_ratio: 2.65 
)

company17 = Company.create(
    ticker: "BBBY",
    name: "Bed Bath & Beyond, Inc.",
    about: "Bed Bath & Beyond, Inc. engages in the operation of retail stores and retails domestics merchandise and home furnishings. It operates through the Bed Bath & Beyond, Christmas Tree Shops, Christmas Tree Shops andThat!, Harmon or Harmon Face Values, buybuy BABY, and World Market, Cost Plus World Market or Cost Plus brands. Its products include domestic merchandise and home furnishings such as bed linens and related items, bath items, kitchen textiles kitchen and tabletop items, fine tabletop, basic house wares, general home furnishings, and consumables. The company was founded by Warren Eisenberg and Leonard Feinstein in 1971 and is .",
    founded: 1971,
    headquarter: "Union, NJ",
    ceo: "Mary A. Winston",
    employees: 62000,
    market_cap: 1.471,
    avg_volume: 4865487,
    pe_ratio: 6.19
)

company18 = Company.create(
    ticker: "DELL",
    name: "Dell Technologies, Inc.",
    about: "Dell Technologies, Inc. is a holding company, which engages in the provision of information technology hardware, software, and service solutions through its subsidiaries. It operates through the following segments: Infrastructure Solutions Group (ISG), Client Solutions Group (CSG), and VMware. The ISG segment includes servers, networking, and storage, as well as services and third-party software and peripherals that are closely tied to the sale of ISG hardware. The CSG segment consists of sales to commercial and consumer customers of desktops, thin client products, and notebooks. The VMware segment provides compute, cloud management, networking and security, storage and availability, and other end-user computing offerings. The company was founded by Michael Saul Dell in 1984.",
    founded: 1984,
    headquarter: "Round Rock, TX",
    ceo: "Michael Saul Dell",
    employees: 157000,
    market_cap: 37.63,
    avg_volume: 1262581,
    pe_ratio: 39.82
)

company19 = Company.create(
    ticker: "EBAY",
    name: "eBay, Inc.",
    about: "eBay, Inc. operates as a commerce company, which engages in the provision of investments and acquisitions to help enable commerce on platforms for buyers and sellers online or on mobile devices. It operates throught the following platforms: Marketplace; Classifieds; StubHub, Corporate, and Others. The Marketplace platform include online marketplace located at www.ebay.com, its localized counterparts and the eBay mobile apps. The Classified platform focuses in collection of brands such as mobile.de, Kijiji, Gumtree, Marktplaats, eBay Kleinanzeigen and others. The StubHub platform gives online ticket platform located at www.stubhub.com, its localized counterparts and the StubHub mobile apps. The company was founded by Pierre M. Omidyar in September 1995.",
    founded: 1995,
    headquarter: "San Jose, CA",
    ceo: "Devin N. Wenig",
    employees: 14000,
    market_cap: 34.425,
    avg_volume: 2411706,
    pe_ratio: 20.53
)

company20 = Company.create(
    ticker: "GE",
    name: "General Electric Co.",
    about: "General Electric Co. is a technology and financial services company that develops and manufactures products for the generation, transmission, distribution, control and utilization of electricity. Its products and services include aircraft engines, power generation, water processing, security technology, medical imaging, business and consumer financing, media content and industrial products. The company operates through the following segments: Power, Oil & Gas, Aviation, Healthcare, Transportation, Appliances & Lighting and GE Capital. The Power segment serves power generation, industrial, government and other customers worldwide with products and services related to energy production. The Oil & Gas segment supplies mission critical equipment for the global oil and gas industry, used in applications spanning the entire value chain from drilling and completion through production, liquefied natural gas and pipeline compression, pipeline inspection, and downstream processing in refineries and petrochemical plants. The Aviation segment products and services include jet engines, aerospace systems and equipment, replacement parts and repair and maintenance services for all categories of commercial aircraft; for a wide variety of military aircraft, including fighters, bombers, tankers and helicopters; for marine applications; and for executive and regional aircraft. The Healthcare segment products include diagnostic imaging systems such as magnetic resonance, computed tomography and positron emission Tomography scanners, X-ray, nuclear imaging, digital mammography and molecular imaging technologies. The Transportation segment engages in global technology and supplier to the railroad, mining, marine and drilling industries. The Appliances & Lighting segment products include major appliances and related services for products such as refrigerators, freezers, electric and gas ranges, cooktops, dishwashers, clothes washers and dryers, microwave ovens, room air conditioners, residential water systems for filtration, softening and heating, and hybrid water heaters. The GE Capital segment offers financial services and products worldwide for businesses of all sizes, services include commercial loans and leases, fleet management, financial programs, credit cards, personal loans and other financial services. The company was founded by Thomas A. Edison in 1878.",
    founded: 1878,
    headquarter: "Boston, MA",
    ceo: "H. Lawrence Culp",
    employees: 283000,
    market_cap: 89.257,
    avg_volume: 31984717,
    pe_ratio: 16.85
)

company21 = Company.create(
    ticker: "HD",
    name: "The Home Depot, Inc.",
    about: "Home Depot, Inc. is a home improvement retailer, which engages in the sale of building materials and home improvement products. Its products include building materials, home improvement products, lawn and garden products, and decor products. It offers home improvement installation services and tool and equipment rental. The company was founded by Bernard Marcus, Arthur M. Blank, Kenneth Gerald Langone and Pat Farrah on June 29, 1978.", 
    founded: 1978,
    headquarter: "Atlanta, GA",
    ceo: "Craig A. Menear",
    employees: 413000,
    market_cap: 233.866,
    avg_volume: 1271929,
    pe_ratio: 20.95
)

company22 = Company.create(
    ticker: "K",
    name: "Kellogg Co.",
    about: "Kellogg Co. engages in the manufacturing, marketing, and distribution of ready-to-eat cereal and convenience foods. Its markets cookies, crackers, crisps, and other convenience foods, under brands such as Kellogg's, Keebler, Cheez-It, Pringles, Murray, Austin and Famous Amos, to supermarkets in the U.S. It operates through the following seven segments: U.S. Snacks, U.S. Morning Foods, U.S. Specialty Channels, North America Other, Europe, Latin America, and Asia Pacific. The U.S. Snacks segment offers cookies, crackers, savory snacks, wholesome snacks and fruit-flavored snacks. The U.S. Morning Foods segment includes cereal and toaster pastries. The U.S. Specialty Channels engages in selling kellogg products to channels such as food service, convenience stores, vending and others. The North America Other segment includes U.S. Frozen, Kashi company, and RX businesses. The Europe segment consists of European countries. The Latin America segment comprises of Central America and Mexico. The Asia Pacific segment composes of Sub-Saharan Africa, Australia, and Asian and Pacific markets. The company was founded by Will Keith Kellogg in 1906.",
    founded: 1906,
    headquarter: "Battle Creek, MI",
    ceo: "Steven A. Cahillane",
    employees: 34000,
    market_cap: 18.901,
    avg_volume: 1014216,
    pe_ratio: 14.84
)

company23 = Company.create(
    ticker: "LOW",
    name: "Lowe's Cos., Inc.",
    about: "Lowe's Cos., Inc. engages in the retail sale of home improvement products. It offers products for maintenance, repair, remodelling, home decorating, and property maintenance. It also provides home improvement products in the following categories: appliances, bathroom, building supply, electrical, flooring, hardware, paint, kitchen, plumbing, lighting & fans, outdoor living, windows, and doors. The company was founded in 1946.",
    founded: 1946,
    headquarter: "Mooresville, NC",
    ceo: "Marvin R. Ellison",
    employees: 300000,
    market_cap: 81.588,
    avg_volume: 1807002,
    pe_ratio: 18.88
)

company24 = Company.create(
    ticker: "PYPL",
    name: "PayPal Holdings, Inc.",
    about: "PayPal Holdings, Inc. engages in the development of technology platform for digital payments. Its solutions include PayPal, PayPal Credit, Braintree, Venmo, Xoom, and Paydiant products. It manages a two-sided proprietary global technology platform that links customers, which consist of both merchants and consumers, to facilitate the processing of payment transactions. The company was founded in December 1998.",
    founded: 1998,
    headquarter: "San Jose, CA",
    ceo: "Daniel H. Schulman",
    employees: 21800,
    market_cap: 136.95,
    avg_volume: 2034422,
    pe_ratio: 59.82
)

company25 = Company.create(
    ticker: "S",
    name: "Sprint Corp.",
    about: "Sprint Corp. is a holding company which engages in the provision of telecommunications services. The company operates through the Wireless and Wireline segments. The Wireless segment offers a variety of wireless voice and data transmission services, devices and accessories, and equipment rentals from devices leased to customers. The Wireline segment delivers wireline voice and data communications services to domestic and international companies, businesses, and consumers. The company was founded on October 5, 2012.",
    founded: 2012,
    headquarter: "Overland Park, KS",
    ceo: "Michel Combes",
    employees: 28500,
    market_cap: 28.799,
    avg_volume: 6573267,
    pe_ratio: 16.69
)

company26 = Company.create(
    ticker: "UBER",
    name: "Uber Technologies, Inc.",
    about: "Uber Technologies, Inc. operates as a technology platform for people and things mobility. The firm offers multi-modal people transportation, restaurant food delivery, and connecting freight carriers and shippers. The company was founded by Oscar Salazar Gaitan, Travis Kalanick, and Garrett Camp in 2009.",
    founded: 2009,
    headquarter: "San Francisco, CA",
    ceo: "Dara Khosrowshahi",
    employees: 22263,
    market_cap: 72.795,
    avg_volume: 6084503,
)

company27 = Company.create(
    ticker: "VZ",
    name: "Verizon Communications, Inc.",
    about: "Verizon Communications, Inc. is a holding company, which engages in the provision communications, information and entertainment products and services to consumers, businesses and governmental agencies. It operates through Wireless and Wireline segments. The Wireless segment provides wireless voice and data services and equipment sales, which are provided to consumer, business, and government customers. The Wireline segment offers broadband video and data; corporate networking solutions; data center and cloud services; security and managed network services; and local and long distance voice services. It also offers voice, data and video services and solutions. The company was founded in 1983.",
    founded: 1983,
    headquarter: "New York, NY",
    ceo: "Hans Erik Vestberg",
    employees: 144500,
    market_cap: 239.962,
    avg_volume: 6086934,
    pe_ratio: 11.45
)

company28 = Company.create(
    ticker: "WMT",
    name: "Walmart, Inc.",
    about: "Walmart, Inc. engages in retail and wholesale business. It operates through the following business segments: Walmart U.S., Walmart International, and Sam's Club. The Walmart U.S. segment perates as a merchandiser of consumer products, operating under the Walmart, Wal-Mart, and Walmart Neighborhood Market brands, as well as walmart.com and other eCommerce brands. The Walmart International segment manags supercenters, supermarkets, hypermarkets, warehouse clubs, and cash & carryl. The Sam's Club segment comprises membership-only warehouse clubs and samsclubs.com. The company was founded by Samuel Moore Walton and James Lawrence Walton in 1945.",
    founded: 1945,
    headquarter: "Bentonville, AR",
    ceo: "C. Douglas McMillon",
    employees: 2200000,
    market_cap: 321.527,
    avg_volume: 2126220,
    pe_ratio: 22.95
)

company29 = Company.create(
    ticker: "Z",
    name: "Zillow Group, Inc.",
    about: "Zillow Group, Inc. engages in the provision of real estate and home-related information marketplaces on mobile and the web. The company operates through the following segments: Internet, Media & Technology (IMT), Homes and Mortgages segment. The IMT segment includes premier agent, rentals and new construction marketplaces, as well as dotloop, display and other advertising and business software solutions. The Homes segment includes Zillow Group's buying and selling of homes directly. The Mortgages segment includes advertising sold to mortgage lenders and other mortgage professionals, mortgage originations through MLOA and the sale of mortgages on the secondary market, as well as Mortech mortgage software solutions. The company was founded by Richard N. Barton and Lloyd D. Frink on July 25, 2014.",
    founded: 2014,
    headquarter: "Seattle, WA",
    ceo: "Richard N. Barton",
    employees: 4336,
    market_cap: 9.914,
    avg_volume: 983367,
)