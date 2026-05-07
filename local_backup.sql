--
-- PostgreSQL database dump
--

\restrict Q1FJqiQ6tToJcasTO8UskkDod1Cm3OA38YqcAec0du2wVl0038ntqFlsp6eaH9E

-- Dumped from database version 15.17 (Homebrew)
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Answer; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."Answer" (
    id text NOT NULL,
    content text NOT NULL,
    "isAccepted" boolean DEFAULT false NOT NULL,
    "helpfulCount" integer DEFAULT 0 NOT NULL,
    "userId" text NOT NULL,
    "questionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Answer" OWNER TO jatintyagi;

--
-- Name: College; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."College" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    location text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    country text DEFAULT 'India'::text NOT NULL,
    type text NOT NULL,
    fees integer NOT NULL,
    "feesMax" integer,
    rating double precision NOT NULL,
    "reviewCount" integer DEFAULT 0 NOT NULL,
    "placementPct" integer NOT NULL,
    "avgPackage" integer,
    "highestPackage" integer,
    "coursesOffered" text[],
    description text NOT NULL,
    about text,
    "imageUrl" text,
    "websiteUrl" text,
    established integer,
    ranking integer,
    nirf integer,
    naac text,
    "cutoffRank" integer,
    "examName" text,
    "totalStudents" integer,
    "totalFaculty" integer,
    "campusArea" integer,
    "hostelAvailable" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."College" OWNER TO jatintyagi;

--
-- Name: CollegeExam; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."CollegeExam" (
    id text NOT NULL,
    "collegeId" text NOT NULL,
    "examId" text NOT NULL,
    cutoff integer
);


ALTER TABLE public."CollegeExam" OWNER TO jatintyagi;

--
-- Name: Course; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."Course" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    duration integer NOT NULL,
    fees integer NOT NULL,
    description text,
    seats integer,
    "collegeId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Course" OWNER TO jatintyagi;

--
-- Name: Exam; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."Exam" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "fullName" text NOT NULL,
    type text NOT NULL,
    level text NOT NULL,
    "conductedBy" text NOT NULL,
    frequency text NOT NULL,
    description text NOT NULL,
    eligibility text NOT NULL,
    syllabus text,
    "importantDates" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Exam" OWNER TO jatintyagi;

--
-- Name: Question; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."Question" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    tags text[],
    views integer DEFAULT 0 NOT NULL,
    "answerCount" integer DEFAULT 0 NOT NULL,
    solved boolean DEFAULT false NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Question" OWNER TO jatintyagi;

--
-- Name: Review; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."Review" (
    id text NOT NULL,
    rating double precision NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    pros text,
    cons text,
    batch integer,
    course text,
    verified boolean DEFAULT false NOT NULL,
    "helpfulCount" integer DEFAULT 0 NOT NULL,
    "userId" text NOT NULL,
    "collegeId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Review" OWNER TO jatintyagi;

--
-- Name: SavedCollege; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."SavedCollege" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "collegeId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SavedCollege" OWNER TO jatintyagi;

--
-- Name: User; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    avatar text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO jatintyagi;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: jatintyagi
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO jatintyagi;

--
-- Data for Name: Answer; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."Answer" (id, content, "isAccepted", "helpfulCount", "userId", "questionId", "createdAt") FROM stdin;
\.


--
-- Data for Name: College; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."College" (id, name, slug, location, city, state, country, type, fees, "feesMax", rating, "reviewCount", "placementPct", "avgPackage", "highestPackage", "coursesOffered", description, about, "imageUrl", "websiteUrl", established, ranking, nirf, naac, "cutoffRank", "examName", "totalStudents", "totalFaculty", "campusArea", "hostelAvailable", "createdAt") FROM stdin;
cmosdj0oa000a4az6zv6tirhv	IIT Bombay	iit-bombay	Mumbai, Maharashtra	Mumbai	Maharashtra	India	Government	220000	250000	4.9	0	98	28	120	{B.Tech,M.Tech,MBA,PhD,M.Sc}	Premier engineering institute ranked among India's finest. Known for cutting-edge research and exceptional industry placements.	IIT Bombay is one of the premier engineering institutes in India, established in 1958. Located in Powai, Mumbai, the institute is spread over 550 acres and offers world-class education in engineering, science, design, and management. With a strong alumni network spanning Google, Microsoft, McKinsey, and hundreds of startups, IIT Bombay continues to shape India's technological future.	https://picsum.photos/seed/iitbombay/800/400	\N	1958	1	3	A++	100	JEE Advanced	10000	600	550	t	2026-05-05 08:36:01.45
cmosdj0p0000n4az6nrc0hpka	IIT Delhi	iit-delhi	New Delhi, Delhi	New Delhi	Delhi	India	Government	215000	245000	4.9	0	97	26	110	{B.Tech,M.Tech,MBA,PhD,M.Sc,B.Des}	Located in the heart of India's capital, IIT Delhi is a hub of innovation and research producing global leaders.	Indian Institute of Technology Delhi, established in 1961, is located in Hauz Khas, New Delhi. The institute offers undergraduate, postgraduate and doctoral programs across engineering, sciences, humanities and management. IIT Delhi has strong industry ties with ISRO, DRDO, and top MNCs, making it one of the most sought-after institutions in India.	https://picsum.photos/seed/iitdelhi/800/400	\N	1961	2	2	A++	120	JEE Advanced	8500	500	325	t	2026-05-05 08:36:01.477
cmosdj0p700104az6qj0ze7en	IIT Madras	iit-madras	Chennai, Tamil Nadu	Chennai	Tamil Nadu	India	Government	210000	240000	4.8	0	96	25	105	{B.Tech,M.Tech,PhD,M.Sc,MBA}	Consistently ranked #1 in India by NIRF, IIT Madras is set in a lush 617-acre campus and is known for research excellence.	IIT Madras, established in 1959, is India's top-ranked institution according to NIRF rankings. The campus is a lush green reserve forest with spotted deer roaming freely. Known for its research output in AI, quantum computing, and ocean engineering, IIT Madras has produced some of India's finest scientists and entrepreneurs.	https://picsum.photos/seed/iitmadras/800/400	\N	1959	3	1	A++	110	JEE Advanced	9000	550	617	t	2026-05-05 08:36:01.483
cmosdj0pd001d4az6smdy27nw	IIT Kanpur	iit-kanpur	Kanpur, UP	Kanpur	UP	India	Government	205000	235000	4.8	0	95	24	100	{B.Tech,M.Tech,PhD,M.Sc,MBA}	Known for its rigorous academics and pioneering research, IIT Kanpur has been the birthplace of many technological innovations.	IIT Kanpur was established in 1959 with assistance from a consortium of nine US research universities. It was the first institute in India to offer Computer Science education. Spread over 1055 acres, the campus houses world-class research facilities. The institute has a strong tradition of entrepreneurship with many startups founded by its alumni.	https://picsum.photos/seed/iitkanpur/800/400	\N	1959	4	4	A++	130	JEE Advanced	8000	480	1055	t	2026-05-05 08:36:01.49
cmosdj0pi001q4az6e9w4ey1d	IIT Kharagpur	iit-kharagpur	Kharagpur, West Bengal	Kharagpur	West Bengal	India	Government	200000	230000	4.7	0	94	22	95	{B.Tech,M.Tech,MBA,PhD,M.Sc,B.Arch,LLB}	The oldest IIT, established 1951. A 2100-acre campus with diverse programs in engineering, law, and management.	IIT Kharagpur is the oldest of the IITs, established in 1951. With a 2100-acre campus, it is the largest. The institute offers the most diverse range of programs among all IITs, including engineering, law, architecture, and management. Its Vinod Gupta School of Management is one of the premier B-schools in India.	https://picsum.photos/seed/iitkharagpur/800/400	\N	1951	5	5	A++	150	JEE Advanced	12000	650	2100	t	2026-05-05 08:36:01.495
cmosdj0pn00234az6kth0grnn	IIT Roorkee	iit-roorkee	Roorkee, Uttarakhand	Roorkee	Uttarakhand	India	Government	205000	235000	4.6	0	92	20	90	{B.Tech,M.Tech,PhD,M.Sc,MBA,B.Arch}	Asia's oldest technical institute, IIT Roorkee has a 175-year legacy of excellence in engineering education.	IIT Roorkee holds the distinction of being the oldest technical institution in Asia, established in 1847 as Thomason College of Civil Engineering. The institute has a rich heritage and has evolved into a comprehensive research university. Located in the foothills of the Himalayas, the campus offers a unique blend of tradition and modernity.	https://picsum.photos/seed/iitroorkee/800/400	\N	1847	6	6	A++	200	JEE Advanced	9500	520	365	t	2026-05-05 08:36:01.499
cmosdj0ps002g4az6yowu15cw	IIT Guwahati	iit-guwahati	Guwahati, Assam	Guwahati	Assam	India	Government	200000	228000	4.5	0	90	18	80	{B.Tech,M.Tech,PhD,M.Sc,MBA,B.Des}	Nestled on the banks of the Brahmaputra, IIT Guwahati is the gateway institute for the development of the Northeast.	IIT Guwahati, established in 1994, is the sixth member of the IIT fraternity. Situated on the north bank of the Brahmaputra river, the campus provides a scenic setting for academic pursuits. The institute has a strong focus on entrepreneurship and has established incubation centers to support student startups.	https://picsum.photos/seed/iitguwahati/800/400	\N	1994	7	7	A+	280	JEE Advanced	6500	380	285	t	2026-05-05 08:36:01.504
cmosdj0pw002t4az6waqhfzuu	NIT Trichy	nit-trichy	Tiruchirappalli, Tamil Nadu	Tiruchirappalli	Tamil Nadu	India	Government	150000	175000	4.5	0	90	15	60	{B.Tech,M.Tech,MBA,M.Sc,PhD}	One of the top NITs, NIT Trichy is renowned for its strong technical education and impressive placement record.	National Institute of Technology, Tiruchirappalli (NIT Trichy), established in 1964, is one of the premier NITs in India. The institute is consistently ranked among the top 10 engineering colleges and has a strong alumni base in Silicon Valley and top Indian companies.	https://picsum.photos/seed/nittrichy/800/400	\N	1964	8	8	A++	8000	JEE Main	7000	400	800	t	2026-05-05 08:36:01.509
cmosdj0q000364az6t3p7k61z	NIT Surathkal	nit-surathkal	Mangalore, Karnataka	Mangalore	Karnataka	India	Government	145000	170000	4.4	0	88	14	55	{B.Tech,M.Tech,M.Sc,PhD}	Located on the scenic Karnataka coast, NIT Surathkal offers world-class engineering education with strong global alumni presence.	National Institute of Technology Karnataka (NIT Surathkal), established in 1960, is located on a 295-acre campus along the Arabian Sea coastline. The institute is known for its strong research culture and has collaborations with international universities.	https://picsum.photos/seed/nitsurathkal/800/400	\N	1960	9	9	A+	12000	JEE Main	6500	380	295	t	2026-05-05 08:36:01.512
cmosdj0q5003j4az64k0y9u67	NIT Warangal	nit-warangal	Warangal, Telangana	Warangal	Telangana	India	Government	142000	165000	4.4	0	87	13	52	{B.Tech,M.Tech,MBA,M.Sc,PhD}	One of the oldest NITs with a strong tradition of academic excellence and leaders across industries.	NIT Warangal, established in 1959, was one of the first Regional Engineering Colleges set up in India. The institute has produced leaders across industries from technology to public service and has a strong placement record with companies like Google, Amazon, and Microsoft.	https://picsum.photos/seed/nitwarangal/800/400	\N	1959	10	10	A+	14000	JEE Main	6000	360	250	t	2026-05-05 08:36:01.518
cmosdj0q9003w4az6psum45ic	NIT Calicut	nit-calicut	Kozhikode, Kerala	Kozhikode	Kerala	India	Government	140000	162000	4.3	0	85	12	48	{B.Tech,M.Tech,MBA,M.Arch,PhD}	NIT Calicut in God's Own Country offers quality engineering education in a beautiful natural setting.	NIT Calicut, established in 1961, is located in the serene surroundings of Kozhikode, Kerala. The institute has a strong reputation for quality education and research. Its School of Management Studies offers an MBA program that ranks among the top in the region.	https://picsum.photos/seed/nitcalicut/800/400	\N	1961	12	12	A+	18000	JEE Main	5500	340	120	t	2026-05-05 08:36:01.521
cmosdj0qe00494az6ou77tnor	NIT Allahabad	nit-allahabad	Prayagraj, UP	Prayagraj	UP	India	Government	138000	160000	4.2	0	84	11	45	{B.Tech,M.Tech,M.Sc,PhD}	Situated in the city of Prayagraj, NIT Allahabad has a strong legacy in engineering education in North India.	Motilal Nehru National Institute of Technology (MNNIT), Allahabad, established in 1961, is located in Prayagraj. The institute has a rich history and has produced distinguished alumni who have made their mark in academia, industry, and public service.	https://picsum.photos/seed/nitallahabad/800/400	\N	1961	14	14	A	22000	JEE Main	5000	310	222	t	2026-05-05 08:36:01.526
cmosdj0qh004m4az679kvro61	NIT Jaipur	nit-jaipur	Jaipur, Rajasthan	Jaipur	Rajasthan	India	Government	135000	158000	4.2	0	83	10	42	{B.Tech,M.Tech,M.Sc,PhD,MBA}	Located in the Pink City, NIT Jaipur is a leading technical institute in Rajasthan with strong industry connections.	Malaviya National Institute of Technology (MNIT), Jaipur, established in 1963, is named after Madan Mohan Malaviya. Located in the vibrant city of Jaipur, the institute has a strong focus on research and industry collaboration, particularly in renewable energy and smart city technologies.	https://picsum.photos/seed/nitjaipur/800/400	\N	1963	15	15	A	25000	JEE Main	5500	320	317	t	2026-05-05 08:36:01.529
cmosdj0ql004z4az63qsnulwv	IIM Ahmedabad	iim-ahmedabad	Ahmedabad, Gujarat	Ahmedabad	Gujarat	India	Government	2400000	2600000	4.9	0	100	35	200	{MBA,PhD,"Executive MBA",PGPX}	India's most prestigious management institution, consistently ranked #1 for MBA in Asia. Average package exceeds ₹35 LPA.	IIM Ahmedabad, established in 1961, is India's top business school and one of the premier management institutions in Asia. The iconic campus designed by Louis Kahn is a UNESCO heritage site. With an average placement package exceeding ₹35 LPA and recruiters like McKinsey, Bain, and Goldman Sachs, IIMA is the dream destination for MBA aspirants.	https://picsum.photos/seed/iima/800/400	\N	1961	1	1	A++	\N	CAT	1200	100	100	t	2026-05-05 08:36:01.534
cmosdj0qp005c4az6c3uebwo7	IIM Bangalore	iim-bangalore	Bengaluru, Karnataka	Bengaluru	Karnataka	India	Government	2300000	2500000	4.9	0	100	33	190	{MBA,PhD,"Executive MBA",EPGP}	Located in India's Silicon Valley, IIM Bangalore has strong tech industry ties and is known for entrepreneurship.	IIM Bangalore, established in 1973, is located in the heart of India's tech capital. The institute has strong ties with the startup ecosystem and consistently ranks among the top 3 business schools in India. Its entrepreneurship program and public policy initiatives set it apart from other IIMs.	https://picsum.photos/seed/iimb/800/400	\N	1973	2	2	A++	\N	CAT	1100	95	100	t	2026-05-05 08:36:01.537
cmosdj0qt005p4az6kh5fr6va	IIM Calcutta	iim-calcutta	Kolkata, West Bengal	Kolkata	West Bengal	India	Government	2250000	2450000	4.8	0	100	32	185	{MBA,PhD,"Executive MBA"}	Asia's first management institution, IIM Calcutta is renowned for its finance and consulting culture.	IIM Calcutta, established in 1961, holds the distinction of being the first management school in Asia. Located in Joka, Kolkata, the institute has a rich heritage and is particularly known for its finance and consulting programs. It is part of the elite IIM ABC trio and consistently places its graduates in top global firms.	https://picsum.photos/seed/iimc/800/400	\N	1961	3	3	A++	\N	CAT	1000	90	135	t	2026-05-05 08:36:01.541
cmosdj0qv00604az6m8om054y	BITS Pilani	bits-pilani	Pilani, Rajasthan	Pilani	Rajasthan	India	Private	520000	580000	4.7	0	93	18	85	{B.Tech,M.Tech,MBA,B.Pharm,M.Sc}	A deemed university of eminence, BITS Pilani is known for its industry-integrated Practice School program.	Birla Institute of Technology and Science (BITS) Pilani, established in 1964, is one of India's most sought-after private engineering institutions. Known for its unique Practice School program where students work with industry partners, BITS has campuses in Pilani, Goa, and Hyderabad. The institute has a strong alumni network in Silicon Valley.	https://picsum.photos/seed/bitspilani/800/400	\N	1964	16	16	A	\N	BITSAT	5000	300	180	t	2026-05-05 08:36:01.544
cmosdj0qz006d4az6xjc6pg86	VIT Vellore	vit-vellore	Vellore, Tamil Nadu	Vellore	Tamil Nadu	India	Private	370000	420000	4.2	0	82	12	45	{B.Tech,M.Tech,MBA,BCA,MCA,M.Sc}	One of India's largest private engineering universities with a diverse student community from 50+ countries.	VIT Vellore, established in 1984, has grown to become one of India's largest private engineering universities. With a diverse student community representing 50+ countries and strong industry partnerships with companies like Google, Microsoft, and Amazon, VIT offers a truly global education experience.	https://picsum.photos/seed/vitvellore/800/400	\N	1984	19	19	A++	\N	VITEEE	35000	2000	360	t	2026-05-05 08:36:01.547
cmosdj0r2006q4az6s9q4cl35	Manipal Institute of Technology	manipal-mit	Manipal, Karnataka	Manipal	Karnataka	India	Private	430000	490000	4.1	0	80	11	42	{B.Tech,M.Tech,MBA,B.Arch,MCA}	MIT Manipal is a premier private engineering college known for its state-of-the-art facilities and industry connections.	Manipal Institute of Technology, established in 1957, is one of India's oldest private engineering colleges. Part of the Manipal Education and Medical Group, the institute offers world-class facilities and has a strong track record in robotics, automotive engineering, and marine technology.	https://picsum.photos/seed/mitmanipal/800/400	\N	1957	22	22	A+	\N	MET	14000	800	180	t	2026-05-05 08:36:01.551
cmosdj0r500734az6r2ynj6d0	Thapar Institute of Engineering	thapar	Patiala, Punjab	Patiala	Punjab	India	Private	450000	500000	4.2	0	84	12	50	{B.Tech,M.Tech,MBA,M.Sc}	A deemed university in Punjab, Thapar is known for its strong B.Tech programs and international collaborations.	Thapar Institute of Engineering and Technology, established in 1956, is a premier deemed university in Punjab. The institute has collaborations with leading universities in the UK, USA, and Australia and is known for its strong industry partnerships particularly in the automobile and manufacturing sectors.	https://picsum.photos/seed/thapar/800/400	\N	1956	24	24	A	\N	JEE Main	10000	600	250	t	2026-05-05 08:36:01.554
cmosdj0ra007g4az6d3q9y2yr	XLRI Jamshedpur	xlri	Jamshedpur, Jharkhand	Jamshedpur	Jharkhand	India	Private	1800000	2000000	4.7	0	100	30	150	{MBA,BM,PhD,"Executive MBA"}	India's oldest B-school, XLRI is renowned for its HRM and Business Management programs.	Xavier School of Management (XLRI), established in 1949, is India's oldest B-school. Located in the steel city of Jamshedpur, XLRI is known for its Human Resource Management program which is considered the best in Asia. The institute has a strong Jesuit tradition and focuses on ethical leadership.	https://picsum.photos/seed/xlri/800/400	\N	1949	4	4	A++	\N	CAT	800	70	40	t	2026-05-05 08:36:01.558
cmosdj0rd007t4az6epxjnlxu	SP Jain Institute of Management	spjimr	Mumbai, Maharashtra	Mumbai	Maharashtra	India	Private	1900000	2100000	4.6	0	100	28	140	{PGDM,"Executive PGDM",PhD}	SP Jain is a premier Mumbai B-school known for its PGDM program with strong consulting and finance placements.	S.P. Jain Institute of Management and Research (SPJIMR), established in 1981, is one of India's leading business schools. Located in Mumbai, it is known for its innovative pedagogy and social responsibility initiatives. The institute's PGDM program is highly regarded for its industry immersion and leadership development.	https://picsum.photos/seed/spjimr/800/400	\N	1981	6	6	A++	\N	CAT	600	60	10	t	2026-05-05 08:36:01.561
cmosdj0rg00844az6wjfz9vtj	MDI Gurgaon	mdi-gurgaon	Gurgaon, Haryana	Gurgaon	Haryana	India	Private	2000000	2200000	4.5	0	99	25	120	{PGPM,"Executive PGPM",PhD,NMP}	Located in Gurgaon's corporate hub, MDI offers excellent exposure to India's top corporate ecosystem.	Management Development Institute (MDI), Gurgaon, established in 1973, is a premier B-school known for its Post Graduate Programme in Management. Located in the heart of Gurgaon's corporate district, MDI offers unparalleled access to India's top companies and has strong alumni networks in consulting, banking, and FMCG.	https://picsum.photos/seed/mdigurgaon/800/400	\N	1973	8	8	A+	\N	CAT	700	65	43	t	2026-05-05 08:36:01.565
cmosdj0rj008h4az6irdt5h0m	IMT Ghaziabad	imt-ghaziabad	Ghaziabad, UP	Ghaziabad	UP	India	Private	1500000	1700000	4.3	0	97	18	90	{PGDM,"Executive PGDM",PhD}	IMT Ghaziabad is a leading NCR B-school known for its marketing and operations programs.	Institute of Management Technology (IMT), Ghaziabad, established in 1980, is one of the top private business schools in NCR. The institute offers a strong PGDM program with specializations in marketing, finance, HR, and operations. IMT has active alumni networks across India and internationally.	https://picsum.photos/seed/imtghaziabad/800/400	\N	1980	12	12	A	\N	CAT	900	75	28	t	2026-05-05 08:36:01.568
cmosdj0rm008s4az6u3e4hdyz	Delhi Technological University	dtu	New Delhi, Delhi	New Delhi	Delhi	India	Government	160000	185000	4.3	0	85	13	55	{B.Tech,M.Tech,MBA,M.Sc}	Formerly Delhi College of Engineering, DTU is one of Delhi's premier engineering colleges with strong placements.	Delhi Technological University (DTU), formerly Delhi College of Engineering, established in 1941, is one of Delhi's oldest and most prestigious engineering colleges. The institute has strong industry ties particularly in software, finance, and consulting, and its graduates are placed at top companies like Google, Amazon, and Goldman Sachs.	https://picsum.photos/seed/dtu/800/400	\N	1941	35	35	A+	\N	JEE Main	8000	450	164	t	2026-05-05 08:36:01.571
cmosdj0rq00954az6exzlm0cl	NSUT Delhi	nsut	New Delhi, Delhi	New Delhi	Delhi	India	Government	155000	178000	4.2	0	83	12	52	{B.Tech,M.Tech,MBA}	NSUT (formerly NSIT) is a top Delhi government engineering college located in Dwarka with strong industry linkages.	Netaji Subhas University of Technology (NSUT), formerly NSIT, established in 1983, is one of Delhi's top engineering colleges. Located in Dwarka, the institute offers quality technical education and has strong industry connections particularly in IT and electronics sectors.	https://picsum.photos/seed/nsut/800/400	\N	1983	38	38	A	\N	JEE Main	7500	420	145	t	2026-05-05 08:36:01.574
cmosdj0rs009g4az6zp3w36cy	Jadavpur University	jadavpur	Kolkata, West Bengal	Kolkata	West Bengal	India	Government	50000	65000	4.4	0	85	11	48	{B.Tech,M.Tech,MBA,B.Sc,M.Sc,PhD,B.Arch}	One of India's most prestigious state universities, known for engineering, arts and research excellence.	Jadavpur University, established in 1955, is one of the most prestigious state universities in India. Located in Kolkata, the university is known for its strong research culture and is ranked among the top institutions in the country. The engineering faculty is particularly well-regarded for its academic rigor.	https://picsum.photos/seed/jadavpur/800/400	\N	1955	9	9	A++	\N	WBJEE	15000	700	60	t	2026-05-05 08:36:01.577
cmosdj0rw009t4az64zf2csu4	Anna University	anna-university	Chennai, Tamil Nadu	Chennai	Tamil Nadu	India	Government	80000	95000	4.2	0	78	9	40	{B.Tech,M.Tech,M.Sc,MBA,PhD}	A leading state technical university in Tamil Nadu, Anna University serves lakhs of engineering students.	Anna University, established in 1978 and named after former Tamil Nadu Chief Minister C.N. Annadurai, is a technical university located in Chennai. The university serves as the affiliating body for over 500 engineering colleges in Tamil Nadu and has a strong research culture particularly in civil and environmental engineering.	https://picsum.photos/seed/annauniversity/800/400	\N	1978	18	18	A++	\N	TNEA	12000	600	185	t	2026-05-05 08:36:01.58
cmosdj0rz00a64az62ive0ob0	AIIMS Delhi	aiims-delhi	New Delhi, Delhi	New Delhi	Delhi	India	Government	6000	8000	4.9	0	100	20	60	{MBBS,MD,MS,PhD,"B.Sc Nursing"}	India's most prestigious medical institution. AIIMS Delhi sets the gold standard for medical education in India.	All India Institute of Medical Sciences (AIIMS), New Delhi, established in 1956, is the premier medical institution in India. Known for its exceptional medical education, research, and patient care, AIIMS Delhi is consistently ranked #1 in medical colleges by NIRF. With fees as low as ₹6,000 per year, it represents incredible value.	https://picsum.photos/seed/aiimsndelhi/800/400	\N	1956	1	1	A++	50	NEET	3000	400	80	t	2026-05-05 08:36:01.584
cmosdj0s200ah4az676vtixyy	CMC Vellore	cmc-vellore	Vellore, Tamil Nadu	Vellore	Tamil Nadu	India	Private	200000	250000	4.8	0	99	18	55	{MBBS,MD,MS,PhD,"B.Sc Nursing",BPT}	One of Asia's finest medical institutions, CMC Vellore has a 125-year legacy of medical excellence and patient care.	Christian Medical College (CMC), Vellore, established in 1900 by Dr. Ida Scudder, is one of the oldest and most prestigious medical institutions in Asia. Known for its commitment to patient care, especially for the underprivileged, CMC Vellore is consistently ranked among the top medical colleges in India.	https://picsum.photos/seed/cmcvellore/800/400	\N	1900	3	3	A++	100	NEET	2500	350	200	t	2026-05-05 08:36:01.586
\.


--
-- Data for Name: CollegeExam; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."CollegeExam" (id, "collegeId", "examId", cutoff) FROM stdin;
cmosdj0od000c4az6nvtcu5r3	cmosdj0oa000a4az6zv6tirhv	cmosdj0o600074az6ejmakfa0	\N
cmosdj0ot000e4az61b32pq8i	cmosdj0oa000a4az6zv6tirhv	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0p2000p4az6f8l6m7ha	cmosdj0p0000n4az6nrc0hpka	cmosdj0o600074az6ejmakfa0	\N
cmosdj0p3000r4az69p1adw99	cmosdj0p0000n4az6nrc0hpka	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0p900124az6iy1jwpfo	cmosdj0p700104az6qj0ze7en	cmosdj0o600074az6ejmakfa0	\N
cmosdj0pa00144az6awwvt0p0	cmosdj0p700104az6qj0ze7en	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0pe001f4az6w7wz68l9	cmosdj0pd001d4az6smdy27nw	cmosdj0o600074az6ejmakfa0	\N
cmosdj0pf001h4az6k83mvrc3	cmosdj0pd001d4az6smdy27nw	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0pj001s4az696o16cx7	cmosdj0pi001q4az6e9w4ey1d	cmosdj0o600074az6ejmakfa0	\N
cmosdj0pk001u4az6pd1m97bq	cmosdj0pi001q4az6e9w4ey1d	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0po00254az692wsx65f	cmosdj0pn00234az6kth0grnn	cmosdj0o600074az6ejmakfa0	\N
cmosdj0po00274az6z2rc7req	cmosdj0pn00234az6kth0grnn	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0ps002i4az6trfyj4hp	cmosdj0ps002g4az6yowu15cw	cmosdj0o600074az6ejmakfa0	\N
cmosdj0pt002k4az6mdgguahu	cmosdj0ps002g4az6yowu15cw	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0px002v4az6939rfy7t	cmosdj0pw002t4az6waqhfzuu	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0px002x4az6r8rh5p1c	cmosdj0pw002t4az6waqhfzuu	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0q000384az67e6lftdj	cmosdj0q000364az6t3p7k61z	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0q1003a4az64fkj3kwe	cmosdj0q000364az6t3p7k61z	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0q6003l4az6x5ggj432	cmosdj0q5003j4az64k0y9u67	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0q6003n4az6nl1310h4	cmosdj0q5003j4az64k0y9u67	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0qa003y4az6wq8wkpl8	cmosdj0q9003w4az6psum45ic	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0qb00404az6kl88qw4b	cmosdj0q9003w4az6psum45ic	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0qe004b4az6byv4ufxr	cmosdj0qe00494az6ou77tnor	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0qf004d4az6onpmi8ls	cmosdj0qe00494az6ou77tnor	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0qi004o4az6ajb37bvk	cmosdj0qh004m4az679kvro61	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0qj004q4az6ktdf5e80	cmosdj0qh004m4az679kvro61	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0qm00514az62dbvz996	cmosdj0ql004z4az63qsnulwv	cmosdj0nt00014az647kbev1d	\N
cmosdj0qn00534az6pppgim9q	cmosdj0ql004z4az63qsnulwv	cmosdj0o500064az6i5bna5ip	\N
cmosdj0qp005e4az6gxaj2s62	cmosdj0qp005c4az6c3uebwo7	cmosdj0nt00014az647kbev1d	\N
cmosdj0qq005g4az6o2uyfwo6	cmosdj0qp005c4az6c3uebwo7	cmosdj0o500064az6i5bna5ip	\N
cmosdj0qt005r4az62vdpmnvq	cmosdj0qt005p4az6kh5fr6va	cmosdj0nt00014az647kbev1d	\N
cmosdj0qu005t4az6p0ysnjwy	cmosdj0qt005p4az6kh5fr6va	cmosdj0o500064az6i5bna5ip	\N
cmosdj0qw00624az6841bdeik	cmosdj0qv00604az6m8om054y	cmosdj0o400054az67ywm82yg	\N
cmosdj0qw00644az6haaffpz6	cmosdj0qv00604az6m8om054y	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0qz006f4az6w8y4kmz7	cmosdj0qz006d4az6xjc6pg86	cmosdj0nx00044az6t2f0gtwj	\N
cmosdj0r0006h4az6f7sewpvn	cmosdj0qz006d4az6xjc6pg86	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0r3006s4az6v0ofafm1	cmosdj0r2006q4az6s9q4cl35	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0r3006u4az6anq998um	cmosdj0r2006q4az6s9q4cl35	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0r600754az6rls3znd5	cmosdj0r500734az6r2ynj6d0	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0r700774az63a734vin	cmosdj0r500734az6r2ynj6d0	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0ra007i4az6ea13nfkk	cmosdj0ra007g4az6d3q9y2yr	cmosdj0nt00014az647kbev1d	\N
cmosdj0rb007k4az61s93r9v0	cmosdj0ra007g4az6d3q9y2yr	cmosdj0o700084az6cjs0tgb0	\N
cmosdj0re007v4az6qtxnuqyr	cmosdj0rd007t4az6epxjnlxu	cmosdj0nt00014az647kbev1d	\N
cmosdj0re007x4az6osmt88hc	cmosdj0rd007t4az6epxjnlxu	cmosdj0o500064az6i5bna5ip	\N
cmosdj0rh00864az63eq2qo4n	cmosdj0rg00844az6wjfz9vtj	cmosdj0nt00014az647kbev1d	\N
cmosdj0rh00884az6lfiw3tbg	cmosdj0rg00844az6wjfz9vtj	cmosdj0o500064az6i5bna5ip	\N
cmosdj0rk008j4az6mgrwu4xw	cmosdj0rj008h4az6irdt5h0m	cmosdj0nt00014az647kbev1d	\N
cmosdj0rk008l4az69ost7gky	cmosdj0rj008h4az6irdt5h0m	cmosdj0o700084az6cjs0tgb0	\N
cmosdj0rn008u4az6td8bq8m4	cmosdj0rm008s4az6u3e4hdyz	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0rn008w4az6pcma8ykr	cmosdj0rm008s4az6u3e4hdyz	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0rq00974az60qkw0mca	cmosdj0rq00954az6exzlm0cl	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0rr00994az65uuvix45	cmosdj0rq00954az6exzlm0cl	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0rt009i4az6c9u9bjlw	cmosdj0rs009g4az6zp3w36cy	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0rt009k4az6cbxj7xci	cmosdj0rs009g4az6zp3w36cy	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0rw009v4az6rrmq2pqm	cmosdj0rw009t4az64zf2csu4	cmosdj0nn00004az6vdh3y3m5	\N
cmosdj0rx009x4az6kv3cikv5	cmosdj0rw009t4az64zf2csu4	cmosdj0nu00034az6d0pkcm9k	\N
cmosdj0s000a84az6y3413q7x	cmosdj0rz00a64az62ive0ob0	cmosdj0o800094az6uxtpx3t7	\N
cmosdj0s200aj4az6epgkv1hq	cmosdj0s200ah4az676vtixyy	cmosdj0o800094az6uxtpx3t7	\N
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."Course" (id, name, slug, duration, fees, description, seats, "collegeId", "createdAt") FROM stdin;
cmosdj0ou000g4az61wgwx4rd	B.Tech	iit-bombay-btech	4	198000	B.Tech program at IIT Bombay. A comprehensive 4-year program designed to produce industry-ready graduates.	37	cmosdj0oa000a4az6zv6tirhv	2026-05-05 08:36:01.471
cmosdj0ox000i4az6undlt5om	M.Tech	iit-bombay-mtech	2	154000	M.Tech program at IIT Bombay. A comprehensive 2-year program designed to produce industry-ready graduates.	111	cmosdj0oa000a4az6zv6tirhv	2026-05-05 08:36:01.474
cmosdj0oy000k4az67hjjepxq	MBA	iit-bombay-mba	2	242000	MBA program at IIT Bombay. A comprehensive 2-year program designed to produce industry-ready graduates.	74	cmosdj0oa000a4az6zv6tirhv	2026-05-05 08:36:01.475
cmosdj0oz000m4az6ham507xm	PhD	iit-bombay-phd	4	110000	PhD program at IIT Bombay. A comprehensive 4-year program designed to produce industry-ready graduates.	70	cmosdj0oa000a4az6zv6tirhv	2026-05-05 08:36:01.476
cmosdj0p3000t4az6orakqy57	B.Tech	iit-delhi-btech	4	193500	B.Tech program at IIT Delhi. A comprehensive 4-year program designed to produce industry-ready graduates.	135	cmosdj0p0000n4az6nrc0hpka	2026-05-05 08:36:01.48
cmosdj0p4000v4az6wijmcquq	M.Tech	iit-delhi-mtech	2	150500	M.Tech program at IIT Delhi. A comprehensive 2-year program designed to produce industry-ready graduates.	45	cmosdj0p0000n4az6nrc0hpka	2026-05-05 08:36:01.481
cmosdj0p5000x4az6v5myoll2	MBA	iit-delhi-mba	2	236500	MBA program at IIT Delhi. A comprehensive 2-year program designed to produce industry-ready graduates.	135	cmosdj0p0000n4az6nrc0hpka	2026-05-05 08:36:01.481
cmosdj0p6000z4az6m0y8sy2k	PhD	iit-delhi-phd	4	107500	PhD program at IIT Delhi. A comprehensive 4-year program designed to produce industry-ready graduates.	115	cmosdj0p0000n4az6nrc0hpka	2026-05-05 08:36:01.482
cmosdj0pb00164az68r0630zq	B.Tech	iit-madras-btech	4	189000	B.Tech program at IIT Madras. A comprehensive 4-year program designed to produce industry-ready graduates.	47	cmosdj0p700104az6qj0ze7en	2026-05-05 08:36:01.487
cmosdj0pb00184az6o2qe0ay9	M.Tech	iit-madras-mtech	2	147000	M.Tech program at IIT Madras. A comprehensive 2-year program designed to produce industry-ready graduates.	94	cmosdj0p700104az6qj0ze7en	2026-05-05 08:36:01.488
cmosdj0pc001a4az640777fb7	PhD	iit-madras-phd	4	105000	PhD program at IIT Madras. A comprehensive 4-year program designed to produce industry-ready graduates.	63	cmosdj0p700104az6qj0ze7en	2026-05-05 08:36:01.488
cmosdj0pd001c4az6el4mb8ku	M.Sc	iit-madras-msc	2	126000	M.Sc program at IIT Madras. A comprehensive 2-year program designed to produce industry-ready graduates.	35	cmosdj0p700104az6qj0ze7en	2026-05-05 08:36:01.489
cmosdj0pg001j4az66pbt88v3	B.Tech	iit-kanpur-btech	4	184500	B.Tech program at IIT Kanpur. A comprehensive 4-year program designed to produce industry-ready graduates.	45	cmosdj0pd001d4az6smdy27nw	2026-05-05 08:36:01.492
cmosdj0pg001l4az6cuqbhjy4	M.Tech	iit-kanpur-mtech	2	143500	M.Tech program at IIT Kanpur. A comprehensive 2-year program designed to produce industry-ready graduates.	79	cmosdj0pd001d4az6smdy27nw	2026-05-05 08:36:01.493
cmosdj0ph001n4az6vfc5xpqf	PhD	iit-kanpur-phd	4	102500	PhD program at IIT Kanpur. A comprehensive 4-year program designed to produce industry-ready graduates.	61	cmosdj0pd001d4az6smdy27nw	2026-05-05 08:36:01.493
cmosdj0ph001p4az6n6gyrh4u	M.Sc	iit-kanpur-msc	2	123000	M.Sc program at IIT Kanpur. A comprehensive 2-year program designed to produce industry-ready graduates.	64	cmosdj0pd001d4az6smdy27nw	2026-05-05 08:36:01.494
cmosdj0pk001w4az6ejtby6e5	B.Tech	iit-kharagpur-btech	4	180000	B.Tech program at IIT Kharagpur. A comprehensive 4-year program designed to produce industry-ready graduates.	106	cmosdj0pi001q4az6e9w4ey1d	2026-05-05 08:36:01.497
cmosdj0pl001y4az6ivohxrbv	M.Tech	iit-kharagpur-mtech	2	140000	M.Tech program at IIT Kharagpur. A comprehensive 2-year program designed to produce industry-ready graduates.	40	cmosdj0pi001q4az6e9w4ey1d	2026-05-05 08:36:01.497
cmosdj0pl00204az6kprh80hh	MBA	iit-kharagpur-mba	2	220000	MBA program at IIT Kharagpur. A comprehensive 2-year program designed to produce industry-ready graduates.	133	cmosdj0pi001q4az6e9w4ey1d	2026-05-05 08:36:01.498
cmosdj0pm00224az6myu4im97	PhD	iit-kharagpur-phd	4	100000	PhD program at IIT Kharagpur. A comprehensive 4-year program designed to produce industry-ready graduates.	82	cmosdj0pi001q4az6e9w4ey1d	2026-05-05 08:36:01.498
cmosdj0pp00294az6ixlwbmdg	B.Tech	iit-roorkee-btech	4	184500	B.Tech program at IIT Roorkee. A comprehensive 4-year program designed to produce industry-ready graduates.	90	cmosdj0pn00234az6kth0grnn	2026-05-05 08:36:01.501
cmosdj0pq002b4az6qwuj8004	M.Tech	iit-roorkee-mtech	2	143500	M.Tech program at IIT Roorkee. A comprehensive 2-year program designed to produce industry-ready graduates.	147	cmosdj0pn00234az6kth0grnn	2026-05-05 08:36:01.502
cmosdj0pq002d4az6le4c4e5r	PhD	iit-roorkee-phd	4	102500	PhD program at IIT Roorkee. A comprehensive 4-year program designed to produce industry-ready graduates.	114	cmosdj0pn00234az6kth0grnn	2026-05-05 08:36:01.503
cmosdj0pr002f4az6ns8h7nhm	M.Sc	iit-roorkee-msc	2	123000	M.Sc program at IIT Roorkee. A comprehensive 2-year program designed to produce industry-ready graduates.	81	cmosdj0pn00234az6kth0grnn	2026-05-05 08:36:01.503
cmosdj0pt002m4az6a2c0rept	B.Tech	iit-guwahati-btech	4	180000	B.Tech program at IIT Guwahati. A comprehensive 4-year program designed to produce industry-ready graduates.	115	cmosdj0ps002g4az6yowu15cw	2026-05-05 08:36:01.506
cmosdj0pu002o4az6m1jhvr78	M.Tech	iit-guwahati-mtech	2	140000	M.Tech program at IIT Guwahati. A comprehensive 2-year program designed to produce industry-ready graduates.	118	cmosdj0ps002g4az6yowu15cw	2026-05-05 08:36:01.507
cmosdj0pv002q4az6u6rzzy54	PhD	iit-guwahati-phd	4	100000	PhD program at IIT Guwahati. A comprehensive 4-year program designed to produce industry-ready graduates.	53	cmosdj0ps002g4az6yowu15cw	2026-05-05 08:36:01.507
cmosdj0pv002s4az6ujcdno8q	M.Sc	iit-guwahati-msc	2	120000	M.Sc program at IIT Guwahati. A comprehensive 2-year program designed to produce industry-ready graduates.	72	cmosdj0ps002g4az6yowu15cw	2026-05-05 08:36:01.508
cmosdj0py002z4az6qyv8899h	B.Tech	nit-trichy-btech	4	135000	B.Tech program at NIT Trichy. A comprehensive 4-year program designed to produce industry-ready graduates.	79	cmosdj0pw002t4az6waqhfzuu	2026-05-05 08:36:01.51
cmosdj0py00314az61nntt2zj	M.Tech	nit-trichy-mtech	2	105000	M.Tech program at NIT Trichy. A comprehensive 2-year program designed to produce industry-ready graduates.	144	cmosdj0pw002t4az6waqhfzuu	2026-05-05 08:36:01.511
cmosdj0pz00334az6juixybzk	MBA	nit-trichy-mba	2	165000	MBA program at NIT Trichy. A comprehensive 2-year program designed to produce industry-ready graduates.	124	cmosdj0pw002t4az6waqhfzuu	2026-05-05 08:36:01.511
cmosdj0pz00354az64t4x960x	M.Sc	nit-trichy-msc	2	90000	M.Sc program at NIT Trichy. A comprehensive 2-year program designed to produce industry-ready graduates.	109	cmosdj0pw002t4az6waqhfzuu	2026-05-05 08:36:01.512
cmosdj0q1003c4az6zacqtsnn	B.Tech	nit-surathkal-btech	4	130500	B.Tech program at NIT Surathkal. A comprehensive 4-year program designed to produce industry-ready graduates.	61	cmosdj0q000364az6t3p7k61z	2026-05-05 08:36:01.514
cmosdj0q2003e4az6j62o11og	M.Tech	nit-surathkal-mtech	2	101500	M.Tech program at NIT Surathkal. A comprehensive 2-year program designed to produce industry-ready graduates.	66	cmosdj0q000364az6t3p7k61z	2026-05-05 08:36:01.514
cmosdj0q2003g4az6sc52eyi4	M.Sc	nit-surathkal-msc	2	87000	M.Sc program at NIT Surathkal. A comprehensive 2-year program designed to produce industry-ready graduates.	43	cmosdj0q000364az6t3p7k61z	2026-05-05 08:36:01.515
cmosdj0q4003i4az6epr6pfb8	PhD	nit-surathkal-phd	4	72500	PhD program at NIT Surathkal. A comprehensive 4-year program designed to produce industry-ready graduates.	121	cmosdj0q000364az6t3p7k61z	2026-05-05 08:36:01.517
cmosdj0q7003p4az6kml29jc1	B.Tech	nit-warangal-btech	4	127800	B.Tech program at NIT Warangal. A comprehensive 4-year program designed to produce industry-ready graduates.	147	cmosdj0q5003j4az64k0y9u67	2026-05-05 08:36:01.519
cmosdj0q7003r4az6254wojyu	M.Tech	nit-warangal-mtech	2	99400	M.Tech program at NIT Warangal. A comprehensive 2-year program designed to produce industry-ready graduates.	100	cmosdj0q5003j4az64k0y9u67	2026-05-05 08:36:01.52
cmosdj0q8003t4az626zuetrj	MBA	nit-warangal-mba	2	156200	MBA program at NIT Warangal. A comprehensive 2-year program designed to produce industry-ready graduates.	110	cmosdj0q5003j4az64k0y9u67	2026-05-05 08:36:01.52
cmosdj0q8003v4az68pwojg5y	M.Sc	nit-warangal-msc	2	85200	M.Sc program at NIT Warangal. A comprehensive 2-year program designed to produce industry-ready graduates.	99	cmosdj0q5003j4az64k0y9u67	2026-05-05 08:36:01.521
cmosdj0qc00424az6m4ffzxkz	B.Tech	nit-calicut-btech	4	126000	B.Tech program at NIT Calicut. A comprehensive 4-year program designed to produce industry-ready graduates.	49	cmosdj0q9003w4az6psum45ic	2026-05-05 08:36:01.524
cmosdj0qc00444az6vwz9ycjr	M.Tech	nit-calicut-mtech	2	98000	M.Tech program at NIT Calicut. A comprehensive 2-year program designed to produce industry-ready graduates.	86	cmosdj0q9003w4az6psum45ic	2026-05-05 08:36:01.525
cmosdj0qd00464az6ol01qa4f	MBA	nit-calicut-mba	2	154000	MBA program at NIT Calicut. A comprehensive 2-year program designed to produce industry-ready graduates.	73	cmosdj0q9003w4az6psum45ic	2026-05-05 08:36:01.525
cmosdj0qd00484az6ajynyab8	M.Arch	nit-calicut-march	3	140000	M.Arch program at NIT Calicut. A comprehensive 3-year program designed to produce industry-ready graduates.	105	cmosdj0q9003w4az6psum45ic	2026-05-05 08:36:01.526
cmosdj0qf004f4az60te9yvad	B.Tech	nit-allahabad-btech	4	124200	B.Tech program at NIT Allahabad. A comprehensive 4-year program designed to produce industry-ready graduates.	88	cmosdj0qe00494az6ou77tnor	2026-05-05 08:36:01.528
cmosdj0qg004h4az6ofca25z4	M.Tech	nit-allahabad-mtech	2	96600	M.Tech program at NIT Allahabad. A comprehensive 2-year program designed to produce industry-ready graduates.	68	cmosdj0qe00494az6ou77tnor	2026-05-05 08:36:01.528
cmosdj0qg004j4az6u4ovjjgd	M.Sc	nit-allahabad-msc	2	82800	M.Sc program at NIT Allahabad. A comprehensive 2-year program designed to produce industry-ready graduates.	76	cmosdj0qe00494az6ou77tnor	2026-05-05 08:36:01.529
cmosdj0qh004l4az6tz0b6wif	PhD	nit-allahabad-phd	4	69000	PhD program at NIT Allahabad. A comprehensive 4-year program designed to produce industry-ready graduates.	78	cmosdj0qe00494az6ou77tnor	2026-05-05 08:36:01.529
cmosdj0qj004s4az65i32qzet	B.Tech	nit-jaipur-btech	4	121500	B.Tech program at NIT Jaipur. A comprehensive 4-year program designed to produce industry-ready graduates.	47	cmosdj0qh004m4az679kvro61	2026-05-05 08:36:01.532
cmosdj0qk004u4az6a4z24gnq	M.Tech	nit-jaipur-mtech	2	94500	M.Tech program at NIT Jaipur. A comprehensive 2-year program designed to produce industry-ready graduates.	123	cmosdj0qh004m4az679kvro61	2026-05-05 08:36:01.532
cmosdj0qk004w4az64jiujm9q	M.Sc	nit-jaipur-msc	2	81000	M.Sc program at NIT Jaipur. A comprehensive 2-year program designed to produce industry-ready graduates.	146	cmosdj0qh004m4az679kvro61	2026-05-05 08:36:01.533
cmosdj0ql004y4az6cwgrd6l1	PhD	nit-jaipur-phd	4	67500	PhD program at NIT Jaipur. A comprehensive 4-year program designed to produce industry-ready graduates.	100	cmosdj0qh004m4az679kvro61	2026-05-05 08:36:01.533
cmosdj0qn00554az6bpw31szz	MBA	iim-ahmedabad-mba	2	2640000	MBA program at IIM Ahmedabad. A comprehensive 2-year program designed to produce industry-ready graduates.	146	cmosdj0ql004z4az63qsnulwv	2026-05-05 08:36:01.535
cmosdj0qn00574az6khvbetv2	PhD	iim-ahmedabad-phd	4	1200000	PhD program at IIM Ahmedabad. A comprehensive 4-year program designed to produce industry-ready graduates.	63	cmosdj0ql004z4az63qsnulwv	2026-05-05 08:36:01.536
cmosdj0qo00594az62pwp61lp	Executive MBA	iim-ahmedabad-executive-mba	3	2400000	Executive MBA program at IIM Ahmedabad. A comprehensive 3-year program designed to produce industry-ready graduates.	107	cmosdj0ql004z4az63qsnulwv	2026-05-05 08:36:01.536
cmosdj0qo005b4az6bmshmu4u	PGPX	iim-ahmedabad-pgpx	3	2400000	PGPX program at IIM Ahmedabad. A comprehensive 3-year program designed to produce industry-ready graduates.	121	cmosdj0ql004z4az63qsnulwv	2026-05-05 08:36:01.537
cmosdj0qq005i4az6uudf6hvb	MBA	iim-bangalore-mba	2	2530000	MBA program at IIM Bangalore. A comprehensive 2-year program designed to produce industry-ready graduates.	138	cmosdj0qp005c4az6c3uebwo7	2026-05-05 08:36:01.539
cmosdj0qr005k4az6bxt4biu4	PhD	iim-bangalore-phd	4	1150000	PhD program at IIM Bangalore. A comprehensive 4-year program designed to produce industry-ready graduates.	72	cmosdj0qp005c4az6c3uebwo7	2026-05-05 08:36:01.539
cmosdj0qs005m4az67h8jonee	Executive MBA	iim-bangalore-executive-mba	3	2300000	Executive MBA program at IIM Bangalore. A comprehensive 3-year program designed to produce industry-ready graduates.	130	cmosdj0qp005c4az6c3uebwo7	2026-05-05 08:36:01.54
cmosdj0qs005o4az6gu66nrsb	EPGP	iim-bangalore-epgp	3	2300000	EPGP program at IIM Bangalore. A comprehensive 3-year program designed to produce industry-ready graduates.	107	cmosdj0qp005c4az6c3uebwo7	2026-05-05 08:36:01.541
cmosdj0qu005v4az66eiaqiin	MBA	iim-calcutta-mba	2	2475000	MBA program at IIM Calcutta. A comprehensive 2-year program designed to produce industry-ready graduates.	145	cmosdj0qt005p4az6kh5fr6va	2026-05-05 08:36:01.543
cmosdj0qu005x4az6omg1e94h	PhD	iim-calcutta-phd	4	1125000	PhD program at IIM Calcutta. A comprehensive 4-year program designed to produce industry-ready graduates.	69	cmosdj0qt005p4az6kh5fr6va	2026-05-05 08:36:01.543
cmosdj0qv005z4az64so2of24	Executive MBA	iim-calcutta-executive-mba	3	2250000	Executive MBA program at IIM Calcutta. A comprehensive 3-year program designed to produce industry-ready graduates.	139	cmosdj0qt005p4az6kh5fr6va	2026-05-05 08:36:01.543
cmosdj0qx00664az6vpnbtgwg	B.Tech	bits-pilani-btech	4	468000	B.Tech program at BITS Pilani. A comprehensive 4-year program designed to produce industry-ready graduates.	122	cmosdj0qv00604az6m8om054y	2026-05-05 08:36:01.545
cmosdj0qx00684az6tlanndut	M.Tech	bits-pilani-mtech	2	364000	M.Tech program at BITS Pilani. A comprehensive 2-year program designed to produce industry-ready graduates.	135	cmosdj0qv00604az6m8om054y	2026-05-05 08:36:01.546
cmosdj0qy006a4az60mxdyyb2	MBA	bits-pilani-mba	2	572000	MBA program at BITS Pilani. A comprehensive 2-year program designed to produce industry-ready graduates.	146	cmosdj0qv00604az6m8om054y	2026-05-05 08:36:01.546
cmosdj0qy006c4az6kydjpt4k	B.Pharm	bits-pilani-bpharm	3	520000	B.Pharm program at BITS Pilani. A comprehensive 3-year program designed to produce industry-ready graduates.	69	cmosdj0qv00604az6m8om054y	2026-05-05 08:36:01.547
cmosdj0r1006j4az67aijt5di	B.Tech	vit-vellore-btech	4	333000	B.Tech program at VIT Vellore. A comprehensive 4-year program designed to produce industry-ready graduates.	84	cmosdj0qz006d4az6xjc6pg86	2026-05-05 08:36:01.549
cmosdj0r1006l4az68518ng5u	M.Tech	vit-vellore-mtech	2	258999	M.Tech program at VIT Vellore. A comprehensive 2-year program designed to produce industry-ready graduates.	63	cmosdj0qz006d4az6xjc6pg86	2026-05-05 08:36:01.55
cmosdj0r2006n4az64eaxy48k	MBA	vit-vellore-mba	2	407000	MBA program at VIT Vellore. A comprehensive 2-year program designed to produce industry-ready graduates.	139	cmosdj0qz006d4az6xjc6pg86	2026-05-05 08:36:01.55
cmosdj0r2006p4az67p3cho8a	BCA	vit-vellore-bca	3	258999	BCA program at VIT Vellore. A comprehensive 3-year program designed to produce industry-ready graduates.	72	cmosdj0qz006d4az6xjc6pg86	2026-05-05 08:36:01.55
cmosdj0r4006w4az61hfhew7h	B.Tech	manipal-mit-btech	4	387000	B.Tech program at Manipal Institute of Technology. A comprehensive 4-year program designed to produce industry-ready graduates.	93	cmosdj0r2006q4az6s9q4cl35	2026-05-05 08:36:01.552
cmosdj0r4006y4az6g2f1r5vs	M.Tech	manipal-mit-mtech	2	301000	M.Tech program at Manipal Institute of Technology. A comprehensive 2-year program designed to produce industry-ready graduates.	77	cmosdj0r2006q4az6s9q4cl35	2026-05-05 08:36:01.553
cmosdj0r500704az6zdnlvcy7	MBA	manipal-mit-mba	2	473000	MBA program at Manipal Institute of Technology. A comprehensive 2-year program designed to produce industry-ready graduates.	97	cmosdj0r2006q4az6s9q4cl35	2026-05-05 08:36:01.553
cmosdj0r500724az61r75p94w	B.Arch	manipal-mit-barch	3	430000	B.Arch program at Manipal Institute of Technology. A comprehensive 3-year program designed to produce industry-ready graduates.	77	cmosdj0r2006q4az6s9q4cl35	2026-05-05 08:36:01.553
cmosdj0r700794az62uspafdb	B.Tech	thapar-btech	4	405000	B.Tech program at Thapar Institute of Engineering. A comprehensive 4-year program designed to produce industry-ready graduates.	90	cmosdj0r500734az6r2ynj6d0	2026-05-05 08:36:01.556
cmosdj0r8007b4az6s5fs9kd5	M.Tech	thapar-mtech	2	315000	M.Tech program at Thapar Institute of Engineering. A comprehensive 2-year program designed to produce industry-ready graduates.	44	cmosdj0r500734az6r2ynj6d0	2026-05-05 08:36:01.557
cmosdj0r9007d4az60t6wkhav	MBA	thapar-mba	2	495000	MBA program at Thapar Institute of Engineering. A comprehensive 2-year program designed to produce industry-ready graduates.	63	cmosdj0r500734az6r2ynj6d0	2026-05-05 08:36:01.557
cmosdj0r9007f4az69s6cb96i	M.Sc	thapar-msc	2	270000	M.Sc program at Thapar Institute of Engineering. A comprehensive 2-year program designed to produce industry-ready graduates.	69	cmosdj0r500734az6r2ynj6d0	2026-05-05 08:36:01.558
cmosdj0rb007m4az65dcrczfx	MBA	xlri-mba	2	1980000	MBA program at XLRI Jamshedpur. A comprehensive 2-year program designed to produce industry-ready graduates.	106	cmosdj0ra007g4az6d3q9y2yr	2026-05-05 08:36:01.56
cmosdj0rb007o4az6snljy4oa	BM	xlri-bm	3	1800000	BM program at XLRI Jamshedpur. A comprehensive 3-year program designed to produce industry-ready graduates.	76	cmosdj0ra007g4az6d3q9y2yr	2026-05-05 08:36:01.56
cmosdj0rc007q4az6orekc6qh	PhD	xlri-phd	4	900000	PhD program at XLRI Jamshedpur. A comprehensive 4-year program designed to produce industry-ready graduates.	83	cmosdj0ra007g4az6d3q9y2yr	2026-05-05 08:36:01.56
cmosdj0rc007s4az6bqfdncr3	Executive MBA	xlri-executive-mba	3	1800000	Executive MBA program at XLRI Jamshedpur. A comprehensive 3-year program designed to produce industry-ready graduates.	106	cmosdj0ra007g4az6d3q9y2yr	2026-05-05 08:36:01.561
cmosdj0rf007z4az6el9ldldg	PGDM	spjimr-pgdm	2	1900000	PGDM program at SP Jain Institute of Management. A comprehensive 2-year program designed to produce industry-ready graduates.	127	cmosdj0rd007t4az6epxjnlxu	2026-05-05 08:36:01.563
cmosdj0rf00814az6h9xkhtdw	Executive PGDM	spjimr-executive-pgdm	3	1900000	Executive PGDM program at SP Jain Institute of Management. A comprehensive 3-year program designed to produce industry-ready graduates.	131	cmosdj0rd007t4az6epxjnlxu	2026-05-05 08:36:01.563
cmosdj0rf00834az6uik3wn8d	PhD	spjimr-phd	4	950000	PhD program at SP Jain Institute of Management. A comprehensive 4-year program designed to produce industry-ready graduates.	129	cmosdj0rd007t4az6epxjnlxu	2026-05-05 08:36:01.564
cmosdj0ri008a4az6f1cibesh	PGPM	mdi-gurgaon-pgpm	3	2000000	PGPM program at MDI Gurgaon. A comprehensive 3-year program designed to produce industry-ready graduates.	93	cmosdj0rg00844az6wjfz9vtj	2026-05-05 08:36:01.566
cmosdj0ri008c4az6rrqs2a89	Executive PGPM	mdi-gurgaon-executive-pgpm	3	2000000	Executive PGPM program at MDI Gurgaon. A comprehensive 3-year program designed to produce industry-ready graduates.	115	cmosdj0rg00844az6wjfz9vtj	2026-05-05 08:36:01.567
cmosdj0rj008e4az6nrugtwyd	PhD	mdi-gurgaon-phd	4	1000000	PhD program at MDI Gurgaon. A comprehensive 4-year program designed to produce industry-ready graduates.	72	cmosdj0rg00844az6wjfz9vtj	2026-05-05 08:36:01.567
cmosdj0rj008g4az629uxbpm1	NMP	mdi-gurgaon-nmp	3	2000000	NMP program at MDI Gurgaon. A comprehensive 3-year program designed to produce industry-ready graduates.	111	cmosdj0rg00844az6wjfz9vtj	2026-05-05 08:36:01.567
cmosdj0rl008n4az6scudo149	PGDM	imt-ghaziabad-pgdm	2	1500000	PGDM program at IMT Ghaziabad. A comprehensive 2-year program designed to produce industry-ready graduates.	81	cmosdj0rj008h4az6irdt5h0m	2026-05-05 08:36:01.569
cmosdj0rl008p4az6yfqd696w	Executive PGDM	imt-ghaziabad-executive-pgdm	3	1500000	Executive PGDM program at IMT Ghaziabad. A comprehensive 3-year program designed to produce industry-ready graduates.	42	cmosdj0rj008h4az6irdt5h0m	2026-05-05 08:36:01.57
cmosdj0rm008r4az6brkfeze3	PhD	imt-ghaziabad-phd	4	750000	PhD program at IMT Ghaziabad. A comprehensive 4-year program designed to produce industry-ready graduates.	147	cmosdj0rj008h4az6irdt5h0m	2026-05-05 08:36:01.57
cmosdj0ro008y4az6q42hrqjf	B.Tech	dtu-btech	4	144000	B.Tech program at Delhi Technological University. A comprehensive 4-year program designed to produce industry-ready graduates.	142	cmosdj0rm008s4az6u3e4hdyz	2026-05-05 08:36:01.572
cmosdj0rp00904az6178wk973	M.Tech	dtu-mtech	2	112000	M.Tech program at Delhi Technological University. A comprehensive 2-year program designed to produce industry-ready graduates.	42	cmosdj0rm008s4az6u3e4hdyz	2026-05-05 08:36:01.573
cmosdj0rp00924az6jgpt0geh	MBA	dtu-mba	2	176000	MBA program at Delhi Technological University. A comprehensive 2-year program designed to produce industry-ready graduates.	71	cmosdj0rm008s4az6u3e4hdyz	2026-05-05 08:36:01.573
cmosdj0rp00944az6wof4aj71	M.Sc	dtu-msc	2	96000	M.Sc program at Delhi Technological University. A comprehensive 2-year program designed to produce industry-ready graduates.	32	cmosdj0rm008s4az6u3e4hdyz	2026-05-05 08:36:01.574
cmosdj0rr009b4az60gqbjlsj	B.Tech	nsut-btech	4	139500	B.Tech program at NSUT Delhi. A comprehensive 4-year program designed to produce industry-ready graduates.	139	cmosdj0rq00954az6exzlm0cl	2026-05-05 08:36:01.576
cmosdj0rs009d4az6ekmu6cpf	M.Tech	nsut-mtech	2	108500	M.Tech program at NSUT Delhi. A comprehensive 2-year program designed to produce industry-ready graduates.	107	cmosdj0rq00954az6exzlm0cl	2026-05-05 08:36:01.576
cmosdj0rs009f4az64xb0j5u3	MBA	nsut-mba	2	170500	MBA program at NSUT Delhi. A comprehensive 2-year program designed to produce industry-ready graduates.	70	cmosdj0rq00954az6exzlm0cl	2026-05-05 08:36:01.576
cmosdj0ru009m4az6amxibfpo	B.Tech	jadavpur-btech	4	45000	B.Tech program at Jadavpur University. A comprehensive 4-year program designed to produce industry-ready graduates.	68	cmosdj0rs009g4az6zp3w36cy	2026-05-05 08:36:01.578
cmosdj0ru009o4az68niiewn7	M.Tech	jadavpur-mtech	2	35000	M.Tech program at Jadavpur University. A comprehensive 2-year program designed to produce industry-ready graduates.	43	cmosdj0rs009g4az6zp3w36cy	2026-05-05 08:36:01.579
cmosdj0rv009q4az6u261m8jw	MBA	jadavpur-mba	2	55000	MBA program at Jadavpur University. A comprehensive 2-year program designed to produce industry-ready graduates.	73	cmosdj0rs009g4az6zp3w36cy	2026-05-05 08:36:01.579
cmosdj0rv009s4az61us01vwz	B.Sc	jadavpur-bsc	3	50000	B.Sc program at Jadavpur University. A comprehensive 3-year program designed to produce industry-ready graduates.	54	cmosdj0rs009g4az6zp3w36cy	2026-05-05 08:36:01.58
cmosdj0rx009z4az6fe6ej1wg	B.Tech	anna-university-btech	4	72000	B.Tech program at Anna University. A comprehensive 4-year program designed to produce industry-ready graduates.	31	cmosdj0rw009t4az64zf2csu4	2026-05-05 08:36:01.582
cmosdj0ry00a14az6ucc6zgzs	M.Tech	anna-university-mtech	2	56000	M.Tech program at Anna University. A comprehensive 2-year program designed to produce industry-ready graduates.	113	cmosdj0rw009t4az64zf2csu4	2026-05-05 08:36:01.582
cmosdj0ry00a34az63rh7fl9x	M.Sc	anna-university-msc	2	48000	M.Sc program at Anna University. A comprehensive 2-year program designed to produce industry-ready graduates.	117	cmosdj0rw009t4az64zf2csu4	2026-05-05 08:36:01.583
cmosdj0rz00a54az6v154va6l	MBA	anna-university-mba	2	88000	MBA program at Anna University. A comprehensive 2-year program designed to produce industry-ready graduates.	85	cmosdj0rw009t4az64zf2csu4	2026-05-05 08:36:01.583
cmosdj0s000aa4az6qx9n2u8e	MBBS	aiims-delhi-mbbs	5	6000	MBBS program at AIIMS Delhi. A comprehensive 5-year program designed to produce industry-ready graduates.	114	cmosdj0rz00a64az62ive0ob0	2026-05-05 08:36:01.585
cmosdj0s100ac4az6jg3qxqat	MD	aiims-delhi-md	3	6000	MD program at AIIMS Delhi. A comprehensive 3-year program designed to produce industry-ready graduates.	86	cmosdj0rz00a64az62ive0ob0	2026-05-05 08:36:01.585
cmosdj0s100ae4az6rqhkcare	MS	aiims-delhi-ms	3	6000	MS program at AIIMS Delhi. A comprehensive 3-year program designed to produce industry-ready graduates.	94	cmosdj0rz00a64az62ive0ob0	2026-05-05 08:36:01.586
cmosdj0s100ag4az6d79oj0wy	PhD	aiims-delhi-phd	4	3000	PhD program at AIIMS Delhi. A comprehensive 4-year program designed to produce industry-ready graduates.	140	cmosdj0rz00a64az62ive0ob0	2026-05-05 08:36:01.586
cmosdj0s300al4az6ri3e0gbh	MBBS	cmc-vellore-mbbs	5	200000	MBBS program at CMC Vellore. A comprehensive 5-year program designed to produce industry-ready graduates.	129	cmosdj0s200ah4az676vtixyy	2026-05-05 08:36:01.587
cmosdj0s300an4az6its9wxlg	MD	cmc-vellore-md	3	200000	MD program at CMC Vellore. A comprehensive 3-year program designed to produce industry-ready graduates.	124	cmosdj0s200ah4az676vtixyy	2026-05-05 08:36:01.588
cmosdj0s400ap4az6zvn1ebt5	MS	cmc-vellore-ms	3	200000	MS program at CMC Vellore. A comprehensive 3-year program designed to produce industry-ready graduates.	64	cmosdj0s200ah4az676vtixyy	2026-05-05 08:36:01.588
cmosdj0s500ar4az6tiqq1b3s	PhD	cmc-vellore-phd	4	100000	PhD program at CMC Vellore. A comprehensive 4-year program designed to produce industry-ready graduates.	67	cmosdj0s200ah4az676vtixyy	2026-05-05 08:36:01.589
\.


--
-- Data for Name: Exam; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."Exam" (id, name, slug, "fullName", type, level, "conductedBy", frequency, description, eligibility, syllabus, "importantDates", "createdAt") FROM stdin;
cmosdj0nn00004az6vdh3y3m5	JEE Main	jee-main	Joint Entrance Examination Main	Engineering	National	NTA	Biannual	National level entrance exam for admission to NITs, IIITs and other centrally funded institutions.	10+2 with PCM, min 75%	Physics, Chemistry, Mathematics from Class 11 and 12	{"exam": "Jan/Apr 2025", "result": "Feb/May 2025", "registration": "Nov 2024"}	2026-05-05 08:36:01.427
cmosdj0nt00014az647kbev1d	CAT	cat	Common Admission Test	Management	National	IIMs	Annual	Gateway to India's top MBA programs including IIMs. Tests verbal, quantitative and logical skills.	Bachelor's degree with 50% marks	VARC, DILR, Quantitative Aptitude	{"exam": "Nov 2024", "result": "Jan 2025", "registration": "Aug 2024"}	2026-05-05 08:36:01.427
cmosdj0nu00024az6wwsps6b3	CLAT	clat	Common Law Admission Test	Law	National	Consortium of NLUs	Annual	Centralized test for admission to National Law Universities across India.	10+2 with 45% marks	English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques	{"exam": "Dec 2024", "result": "Jan 2025", "registration": "Jan 2025"}	2026-05-05 08:36:01.427
cmosdj0nu00034az6d0pkcm9k	GATE	gate	Graduate Aptitude Test in Engineering	Engineering	National	IIT/IISc	Annual	For admission to M.Tech programs at IITs and NITs and PSU recruitment.	BE/B.Tech or equivalent	Engineering Mathematics + Core subject of chosen branch	{"exam": "Feb 2025", "result": "Mar 2025", "registration": "Sep 2024"}	2026-05-05 08:36:01.427
cmosdj0nx00044az6t2f0gtwj	VITEEE	viteee	VIT Engineering Entrance Examination	Engineering	University	VIT University	Annual	Online entrance test for VIT University campuses across India.	10+2 with PCM/PCB, min 60%	Physics, Chemistry, Mathematics/Biology, English, Aptitude	{"exam": "Apr 2025", "result": "May 2025", "registration": "Nov 2024"}	2026-05-05 08:36:01.427
cmosdj0o400054az67ywm82yg	BITSAT	bitsat	BITS Admission Test	Engineering	University	BITS Pilani	Annual	Online computer-based test for admission to BITS Pilani campuses.	10+2 with PCM, min 75%	Physics, Chemistry, Mathematics, English, Logical Reasoning	{"exam": "May 2025", "result": "Jun 2025", "registration": "Jan 2025"}	2026-05-05 08:36:01.427
cmosdj0o500064az6i5bna5ip	GMAT	gmat	Graduate Management Admission Test	Management	International	GMAC	Year-round	Global MBA entrance test accepted by 7000+ programs in 110+ countries.	Bachelor's degree	Analytical Writing, Integrated Reasoning, Quantitative, Verbal	{"exam": "Year-round", "result": "Immediate", "registration": "Year-round"}	2026-05-05 08:36:01.427
cmosdj0o600074az6ejmakfa0	JEE Advanced	jee-advanced	Joint Entrance Examination Advanced	Engineering	National	IIT	Annual	Prestigious entrance exam for admission to IITs. One of the toughest exams in the world.	Top 2.5 lakh JEE Main qualifiers	Physics, Chemistry, Mathematics — advanced level	{"exam": "May 2025", "result": "Jun 2025", "registration": "Apr 2025"}	2026-05-05 08:36:01.427
cmosdj0o700084az6cjs0tgb0	MAT	mat	Management Aptitude Test	Management	National	AIMA	Annual	National level MBA entrance test accepted by 600+ B-Schools across India.	Bachelor's degree in any discipline	Language Comprehension, Intelligence, Data Analysis, Mathematical Skills	{"exam": "Multiple times/year", "result": "Within 3 weeks", "registration": "Ongoing"}	2026-05-05 08:36:01.427
cmosdj0o800094az6uxtpx3t7	NEET	neet	National Eligibility cum Entrance Test	Medical	National	NTA	Annual	Single national entrance exam for MBBS and BDS admissions across India.	10+2 with PCB, min 50%	Physics, Chemistry, Biology from Class 11 and 12	{"exam": "May 2025", "result": "Jun 2025", "registration": "Feb 2025"}	2026-05-05 08:36:01.427
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."Question" (id, title, content, tags, views, "answerCount", solved, "userId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."Review" (id, rating, title, content, pros, cons, batch, course, verified, "helpfulCount", "userId", "collegeId", "createdAt") FROM stdin;
\.


--
-- Data for Name: SavedCollege; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."SavedCollege" (id, "userId", "collegeId", "createdAt") FROM stdin;
cmovjybn00007t5pslum5b62o	cmouun372000111d4lk9gpyhc	cmosdj0rz00a64az62ive0ob0	2026-05-07 13:59:11.724
cmovjydge0009t5ps6xqomdih	cmouun372000111d4lk9gpyhc	cmosdj0qp005c4az6c3uebwo7	2026-05-07 13:59:14.078
cmovjyeln000bt5psk24ogqo5	cmouun372000111d4lk9gpyhc	cmosdj0oa000a4az6zv6tirhv	2026-05-07 13:59:15.563
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public."User" (id, name, email, password, avatar, "createdAt") FROM stdin;
cmouuktlf000011d465x0dmy4	jatin	jatin@gmai.com	$2a$12$0tTjRH67jVgUYYq5jJkL8Ognsi0U52XTUT31j2tNhUOrMV2req/aq	\N	2026-05-07 02:08:51.411
cmouun372000111d4lk9gpyhc	jatintyagi	jatintyagi@gmail.com	$2a$12$5JxN79dtOC57B4VrzUwHwOxd4slhJRJkR36TOdk7eKJznuNnKF8xq	\N	2026-05-07 02:10:37.167
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: jatintyagi
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
73d9d1d9-3c90-45cb-94c2-c4e4e6110105	ce2952a6579895b44d58418aaa11736b48476f9938996fe8e905369932b63aba	2026-05-05 14:05:51.214776+05:30	20260505083551_init	\N	\N	2026-05-05 14:05:51.180433+05:30	1
\.


--
-- Name: Answer Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);


--
-- Name: CollegeExam CollegeExam_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."CollegeExam"
    ADD CONSTRAINT "CollegeExam_pkey" PRIMARY KEY (id);


--
-- Name: College College_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."College"
    ADD CONSTRAINT "College_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Exam Exam_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Exam"
    ADD CONSTRAINT "Exam_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: SavedCollege SavedCollege_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."SavedCollege"
    ADD CONSTRAINT "SavedCollege_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: CollegeExam_collegeId_examId_key; Type: INDEX; Schema: public; Owner: jatintyagi
--

CREATE UNIQUE INDEX "CollegeExam_collegeId_examId_key" ON public."CollegeExam" USING btree ("collegeId", "examId");


--
-- Name: College_slug_key; Type: INDEX; Schema: public; Owner: jatintyagi
--

CREATE UNIQUE INDEX "College_slug_key" ON public."College" USING btree (slug);


--
-- Name: Exam_slug_key; Type: INDEX; Schema: public; Owner: jatintyagi
--

CREATE UNIQUE INDEX "Exam_slug_key" ON public."Exam" USING btree (slug);


--
-- Name: SavedCollege_userId_collegeId_key; Type: INDEX; Schema: public; Owner: jatintyagi
--

CREATE UNIQUE INDEX "SavedCollege_userId_collegeId_key" ON public."SavedCollege" USING btree ("userId", "collegeId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: jatintyagi
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Answer Answer_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Answer Answer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CollegeExam CollegeExam_collegeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."CollegeExam"
    ADD CONSTRAINT "CollegeExam_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES public."College"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CollegeExam CollegeExam_examId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."CollegeExam"
    ADD CONSTRAINT "CollegeExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES public."Exam"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Course Course_collegeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES public."College"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_collegeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES public."College"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SavedCollege SavedCollege_collegeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."SavedCollege"
    ADD CONSTRAINT "SavedCollege_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES public."College"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SavedCollege SavedCollege_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jatintyagi
--

ALTER TABLE ONLY public."SavedCollege"
    ADD CONSTRAINT "SavedCollege_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict Q1FJqiQ6tToJcasTO8UskkDod1Cm3OA38YqcAec0du2wVl0038ntqFlsp6eaH9E

