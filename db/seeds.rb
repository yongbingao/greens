# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Company.destroy_all

user1 = User.create(username: "Demo", email: "demo@demo.com", password:"longpassword")
user2 = User.create(username: "admin", email: "admin@admin.com", password:"longpassword")
user3 = User.create(username: "ben", email: "ben@gmail.com", password:"longpassword")

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

company6 = Company.create(
    ticker: "ADDYY",
    name: "adidas AG",
    about: "adidas AG engages in design, distribution, and marketing of athletic and sporting lifestyle products. It operates through the following segments: Western Europe, North America, USA Reebok, Russia/CIS, Latin America, Asia/Pacific, and Emerging Markets. It operates under the adidas and Reebok brands. The company was founded by Adolf Dassler in 1920 and is headquartered in Herzogenaurach, Germany.",
    ceo: "Kasper Bo Rørsted",
    employees: 57016,
    founded: 1920,
    headquarter: "Herzogenaurach, Germany",
    market_cap: 57.27,
    avg_volume: 20205,
    dividend: 1.32)

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

company11 = Company.create(
    ticker: "TCEHY",
    name: "Tencent Holdings Ltd.",
    about: "Tencent Holdings Ltd. is an investment company, which engages in the provision of value-added services and online advertising services. It operates through the following segments: Value-Added Services, Online Advertising, and Others. The Value-added Services segment involves online and mobile games, community value-added services, and applications across various Internet and mobile platforms. The Online Advertising segment represents display based and performance based advertisements. The Other segment consists of trademark licensing, software development services, software sales, and other services. The company was founded by Yi Dan Chen, Hua Teng Ma, Chen Ye Xu, Li Qing Zeng, and Zhi Dong Zhang in 1998 and is headquartered in Shenzhen, China.",
    ceo: "Hua Teng Ma",
    employees: 54309,
    founded: 1998,
    headquarter: "Shenzhen, China",
    market_cap: 397.58,
    avg_volume: 2840120,
    dividend: 0.31)

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