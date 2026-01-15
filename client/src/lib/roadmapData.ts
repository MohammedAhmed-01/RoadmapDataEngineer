export interface Resource {
  id: string;
  name: string;
  url: string;
  type: 'video' | 'playlist';
}

export interface RoadmapStage {
  id: number;
  title: string;
  description: string;
  resources: Resource[];
  icon: string;
  color: string;
  backgroundImage: string;
}

export const roadmapData: RoadmapStage[] = [
  {
    id: 1,
    title: 'Python Fundamentals',
    description: 'Master the core programming language for data engineering. Learn syntax, data types, functions, and control flow.',
    resources: [
      {
        id: 'py-1',
        name: 'Python for Beginners',
        url: 'https://youtu.be/XKQaCF_Om8o?si=d16kDaGSgFp28HUk',
        type: 'video',
      },
      {
        id: 'py-2',
        name: 'Python Full Course',
        url: 'https://youtu.be/mlbe7Vxr7yA?si=AB3NymeczJYWs0Za',
        type: 'video',
      },
    ],
    icon: '🐍',
    color: 'from-blue-400 to-blue-600',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 2,
    title: 'Python Libraries for Data',
    description: 'Learn essential libraries for data manipulation and visualization: NumPy, Pandas, and Matplotlib.',
    resources: [
      {
        id: 'lib-1',
        name: 'NumPy Playlist',
        url: 'https://youtube.com/playlist?list=PLfNxJkQVCeH_v12ekEMy7Nmp7ajy5of5b&si=OpPNvC0tukWKjp-f',
        type: 'playlist',
      },
      {
        id: 'lib-2',
        name: 'Pandas Playlist',
        url: 'https://youtube.com/playlist?list=PLfNxJkQVCeH9R6XGdmTcg4FpfWG4Arz00&si=3xd0LyNLZwj4119g',
        type: 'playlist',
      },
      {
        id: 'lib-3',
        name: 'Matplotlib Playlist',
        url: 'https://youtube.com/playlist?list=PLfNxJkQVCeH9G2SYibEjZvMTyHkUNtLmO&si=TZJAN9Z0COpzOCWD',
        type: 'playlist',
      },
    ],
    icon: '📚',
    color: 'from-cyan-400 to-blue-500',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 3,
    title: 'Version Control (Git & GitHub)',
    description: 'Master Git and GitHub to manage your code, collaborate with others, and maintain project history.',
    resources: [
      {
        id: 'git-1',
        name: 'Git & GitHub Tutorial',
        url: 'https://youtu.be/Q6G-J54vgKc?si=CA_oR7Tp0w8ZMREh',
        type: 'video',
      },
      {
        id: 'git-2',
        name: 'Git for Beginners',
        url: 'https://youtu.be/FueXoIewxg0?si=bJMQj6dzqlgtWGVx',
        type: 'video',
      },
    ],
    icon: '🔀',
    color: 'from-purple-400 to-pink-500',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 4,
    title: 'SQL & Databases',
    description: 'The foundation of data storage and retrieval. Learn relational databases and SQL queries.',
    resources: [
      {
        id: 'sql-1',
        name: 'SQL Full Course',
        url: 'https://youtube.com/playlist?list=PL1DUmTEdeA6IdDd4D69Cg_gnFGDcEcmS2&si=fnt0GEtZhkP6DIa1',
        type: 'playlist',
      },
      {
        id: 'sql-2',
        name: 'SQL for Data Engineering',
        url: 'https://youtube.com/playlist?list=PLoRh0POuk1Rw-BZU-DPI6cA_c5W9_2uF_&si=CTfquSqm4JQf3ekW',
        type: 'playlist',
      },
      {
        id: 'sql-3',
        name: 'SQL Practice',
        url: 'https://youtu.be/kb-_GbpH3sQ?si=kQ1VNeSheWKB5pIB',
        type: 'video',
      },
    ],
    icon: '🗄️',
    color: 'from-green-400 to-emerald-600',
    backgroundImage: '/images/database-section.png',
  },
  {
    id: 5,
    title: 'Data Modeling & Visualization',
    description: 'Design data structures and create compelling visualizations. Learn data exploration and Power BI.',
    resources: [
      {
        id: 'dm-1',
        name: 'Data Modeling Playlist',
        url: 'https://youtube.com/playlist?list=PLxNoJq6k39G_m6DYjpz-V92DkaQEiXxkF&si=9bciQaFby014wRAp',
        type: 'playlist',
      },
      {
        id: 'dm-2',
        name: 'Data Exploration & Prep',
        url: 'https://youtube.com/playlist?list=PLQ1FVkQVumFIEH7dYP_2L6vi_LyjlVsGm&si=0mGdz7gpjX8canBD',
        type: 'playlist',
      },
      {
        id: 'dm-3',
        name: 'Data Visualization Playlist',
        url: 'https://youtube.com/playlist?list=PLQ1FVkQVumFJpSpiVrgCF0UQxTGrmVnRk&si=-egy48ujT5PfS_My',
        type: 'playlist',
      },
      {
        id: 'dm-4',
        name: 'Power BI Playlist',
        url: 'https://youtube.com/playlist?list=PL69umUTzySPGWMxnmhX9SV5PIEbdnHv63&si=o5uOz62SOIbiWWHZ',
        type: 'playlist',
      },
    ],
    icon: '📊',
    color: 'from-yellow-400 to-orange-500',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 6,
    title: 'NoSQL & Linux',
    description: 'Expand your database knowledge with NoSQL systems like MongoDB and master Linux operating system.',
    resources: [
      {
        id: 'nosql-1',
        name: 'MongoDB Playlist',
        url: 'https://www.youtube.com/playlist?list=PLlesfn4TAj57XGGSmVzzpxY69-lha1EWEI',
        type: 'playlist',
      },
      {
        id: 'linux-1',
        name: 'Linux for Beginners',
        url: 'https://www.youtube.com/watch?v=gojeTqXdBH0&list=PLYkGz4lY93PVQFa1nQRy8lergfAMRevdO&index=11&pp=iAQB',
        type: 'playlist',
      },
    ],
    icon: '🐧',
    color: 'from-red-400 to-pink-600',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 7,
    title: 'Docker & Containerization',
    description: 'Package and deploy your applications using Docker containers for consistency and scalability.',
    resources: [
      {
        id: 'docker-1',
        name: 'Docker Playlist',
        url: 'https://youtube.com/playlist?list=PLX1bW_GeBRhDkTf_jbdvBbkHs2LCWVeXZ&si=ZQOTt-gJL5M1pkOK',
        type: 'playlist',
      },
      {
        id: 'docker-2',
        name: 'Docker Tutorial',
        url: 'https://youtu.be/PrusdhS2lmo?si=g1B3Ubhu2EDZTygf',
        type: 'video',
      },
      {
        id: 'docker-3',
        name: 'Docker Practice',
        url: 'https://youtube.com/playlist?list=PLzNfs-3kBUJnY7Cy1XovLaAkgfjim05RR&si=spfC2rQZJrfJp7e4',
        type: 'playlist',
      },
    ],
    icon: '🐳',
    color: 'from-blue-400 to-cyan-600',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 8,
    title: 'CI/CD & Automation',
    description: 'Automate your development workflow with GitLab CI/CD and GitHub Actions for continuous integration.',
    resources: [
      {
        id: 'cicd-1',
        name: 'GitLab CI/CD',
        url: 'https://youtu.be/S-kpjjeDZGw?si=oWdyBEipQYVcRnv_',
        type: 'video',
      },
      {
        id: 'cicd-2',
        name: 'GitHub Actions',
        url: 'https://youtu.be/7gJFHjXscr8?si=9yv0EsnKsgu3MT-X',
        type: 'video',
      },
    ],
    icon: '⚙️',
    color: 'from-indigo-400 to-purple-600',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 9,
    title: 'ETL Tools & Orchestration',
    description: 'Master data movement and scheduling with SSIS, Informatica, and Apache Airflow.',
    resources: [
      {
        id: 'etl-1',
        name: 'SSIS Playlist',
        url: 'https://youtube.com/playlist?list=PLH1DHVpguI_ItrUNyE1KCAN0Kpd--HY74&si=wmJ2QImx5K1xtPQS',
        type: 'playlist',
      },
      {
        id: 'etl-2',
        name: 'Informatica Playlist',
        url: 'https://youtube.com/playlist?list=PL3ROcG1DM4m1dvhhayI7gpqD1PXEVmbQF&si=qNocb4AnXfA_rW29',
        type: 'playlist',
      },
      {
        id: 'etl-3',
        name: 'Apache Airflow Playlist',
        url: 'https://www.youtube.com/playlist?list=PLYaPThD6DUS_BKiEPW0W-hZPgxbHXcQ8o',
        type: 'playlist',
      },
      {
        id: 'etl-4',
        name: 'Airflow Tutorial',
        url: 'https://youtu.be/fWcoGSBynQ4?si=oj8tQiCjVZVDwddd',
        type: 'video',
      },
    ],
    icon: '🔄',
    color: 'from-teal-400 to-cyan-600',
    backgroundImage: '/images/python-section.png',
  },
  {
    id: 10,
    title: 'Big Data & Distributed Systems',
    description: 'Handle large-scale data processing with Hadoop, Hive, PySpark, and Kafka.',
    resources: [
      {
        id: 'bigdata-1',
        name: 'Hadoop Playlist 1',
        url: 'https://youtube.com/playlist?list=PLxNoJq6k39G8Ak39PDC-oYvp6ZRvIn3Pa&si=DSfd_sq35s2OamNt',
        type: 'playlist',
      },
      {
        id: 'bigdata-2',
        name: 'Hadoop Playlist 2',
        url: 'https://youtube.com/playlist?list=PLrooD4hY1QqAK5pbBpcthLuMa-cXnXJLE&si=kE0oqGGvOG5Fx9Qn',
        type: 'playlist',
      },
      {
        id: 'bigdata-3',
        name: 'Hive Tutorial',
        url: 'https://youtu.be/rr17cbPGWGA?si=X4eTOMPBI1mtRRa_',
        type: 'video',
      },
      {
        id: 'bigdata-4',
        name: 'PySpark Playlist',
        url: 'https://www.youtube.com/playlist?list=PLJM7jJIw2GC2tPeonyPveb7Y9AggQSGuo',
        type: 'playlist',
      },
      {
        id: 'bigdata-5',
        name: 'Kafka Tutorial',
        url: 'https://youtu.be/X79IjgIUDzU?si=HxMyMfzVV6osBf-D',
        type: 'video',
      },
    ],
    icon: '⚡',
    color: 'from-orange-400 to-red-600',
    backgroundImage: '/images/big-data-section.png',
  },
  {
    id: 11,
    title: 'Cloud Computing',
    description: 'Deploy data solutions in the cloud. Learn cloud platforms and services for data engineering.',
    resources: [
      {
        id: 'cloud-1',
        name: 'Cloud Playlist 1',
        url: 'https://youtube.com/playlist?list=PLZmPGUyBFvUqo76bXGnXq9EofsaV2d8K5&si=IUFdnyyc9hroeY7Y',
        type: 'playlist',
      },
      {
        id: 'cloud-2',
        name: 'Cloud Playlist 2',
        url: 'https://youtube.com/playlist?list=PLJZLxa-J0VZSEVmKS8HQQoi09yB6IHigK&si=EL-5DWYrpD1Qnsni',
        type: 'playlist',
      },
    ],
    icon: '☁️',
    color: 'from-sky-400 to-blue-600',
    backgroundImage: '/images/cloud-section.png',
  },
];
