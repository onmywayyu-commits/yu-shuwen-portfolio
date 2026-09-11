export interface PaperEntry {
  id: string
  title: string
  context: string
  status: 'Coming soon' | 'In progress' | 'Published' | 'Completed'
  summary: string
  tags: string[]
  link?: string
}

/** General-education papers and course writing. */
export const paperEntries: PaperEntry[] = [
  {
    id: 'CHI1000-CHI1000_Chinese_TP.docx',
    title: 'University Chinese — Term Paper',
    context: 'Language & Communication · CHI1000',
    status: 'Published',
    summary: '通识课程：大学中文（CHI1000）。期末课程论文。',
    tags: ['Language & Communication', 'CHI1000', 'Term Paper'],
    link: 'papers/CHI1000_Chinese_TP.docx',
  },
  {
    id: 'GEA2000-GEA2000_Modern_Chinese_History_and_Culture_TP.docx',
    title: 'Modern Chinese History and Culture — Term Paper',
    context: 'History & Culture · GEA2000',
    status: 'Published',
    summary: '通识课程：近现代中国文化（GEA2000）。期末课程论文。',
    tags: ['History & Culture', 'GEA2000', 'Term Paper'],
    link: 'papers/GEA2000_Modern_Chinese_History_and_Culture_TP.docx',
  },
  {
    id: 'GEC3102-GEC3102_The_History_of_Consumer_Culture_Object_Paper2.docx',
    title: 'The History of Consumer Culture — Object Paper',
    context: 'History & Society · GEC3102',
    status: 'Published',
    summary: '通识课程：消费文化史（GEC3102）。以物品为线索的文化史分析。',
    tags: ['History & Society', 'GEC3102', 'Object Paper'],
    link: 'papers/GEC3102_The_History_of_Consumer_Culture_Object_Paper2.docx',
  },
  {
    id: 'GEC3102-GEC3102_The_History_of_Consumer_Culture_Object_Paper2_Anne_s_letter.docx',
    title: 'The History of Consumer Culture — Object Paper',
    context: 'History & Society · GEC3102',
    status: 'Published',
    summary: '通识课程：消费文化史（GEC3102）。以物品为线索的文化史分析。',
    tags: ['History & Society', 'GEC3102', 'Object Paper'],
    link: 'papers/GEC3102_The_History_of_Consumer_Culture_Object_Paper2_Anne_s_letter.docx',
  },
  {
    id: 'GEC3102-GEC3102_The_History_of_Consumer_Culture_Primary_Source_Paper.docx',
    title: 'The History of Consumer Culture — Primary Source Paper',
    context: 'History & Society · GEC3102',
    status: 'Published',
    summary: '通识课程：消费文化史（GEC3102）。基于一手史料的研究写作。',
    tags: ['History & Society', 'GEC3102', 'Primary Source Paper'],
    link: 'papers/GEC3102_The_History_of_Consumer_Culture_Primary_Source_Paper.docx',
  },
  {
    id: 'GED2202-GED2202_Philosophy_of_Religion_TP.docx',
    title: 'Philosophy of Religion — Term Paper',
    context: 'Philosophy & Ethics · GED2202',
    status: 'Published',
    summary: '通识课程：宗教哲学（GED2202）。期末课程论文。',
    tags: ['Philosophy & Ethics', 'GED2202', 'Term Paper'],
    link: 'papers/GED2202_Philosophy_of_Religion_TP.docx',
  },
  {
    id: 'GFH1000-GFH1000_In_Dialogue_with_Humanity-Pre-Content.docx',
    title: 'In Dialogue with Humanity — Pre-course Writing',
    context: 'Humanities · GFH1000',
    status: 'Completed',
    summary: '通识课程：与人文对话（GFH1000）。课程作业与写作练习。',
    tags: ['Humanities', 'GFH1000', 'Pre-course Writing'],
    link: 'papers/GFH1000_In_Dialogue_with_Humanity-Pre-Content.docx',
  },
  {
    id: 'GFH1000-GFH1000_In_Dialogue_with_Humanity-Pre-Slides.pdf',
    title: 'In Dialogue with Humanity — Presentation Slides',
    context: 'Humanities · GFH1000',
    status: 'Published',
    summary: '通识课程：与人文对话（GFH1000）。课堂展示幻灯片。',
    tags: ['Humanities', 'GFH1000', 'Presentation Slides'],
    link: 'papers/GFH1000_In_Dialogue_with_Humanity-Pre-Slides.pdf',
  },
  {
    id: 'GFH1000-GFH1000_In_Dialogue_with_Humanity-RJ-1.docx',
    title: 'In Dialogue with Humanity — Reflection Journal',
    context: 'Humanities · GFH1000',
    status: 'Published',
    summary: '通识课程：与人文对话（GFH1000）。学习过程中的反思日志。',
    tags: ['Humanities', 'GFH1000', 'Reflection Journal'],
    link: 'papers/GFH1000_In_Dialogue_with_Humanity-RJ-1.docx',
  },
  {
    id: 'GFH1000-GFH1000_In_Dialogue_with_Humanity-RJ-2.docx',
    title: 'In Dialogue with Humanity — Reflection Journal',
    context: 'Humanities · GFH1000',
    status: 'Published',
    summary: '通识课程：与人文对话（GFH1000）。学习过程中的反思日志。',
    tags: ['Humanities', 'GFH1000', 'Reflection Journal'],
    link: 'papers/GFH1000_In_Dialogue_with_Humanity-RJ-2.docx',
  },
  {
    id: 'GFN1000-GFN1000_In_Dialogue_with_Nature-RJ.docx',
    title: 'In Dialogue with Nature — Reflection Journal',
    context: 'Natural Sciences · GFN1000',
    status: 'Published',
    summary: '通识课程：与自然对话（GFN1000）。学习过程中的反思日志。',
    tags: ['Natural Sciences', 'GFN1000', 'Reflection Journal'],
    link: 'papers/GFN1000_In_Dialogue_with_Nature-RJ.docx',
  },
  {
    id: 'GFN1000-GFN1000_In_Dialogue_with_Nature-TP.docx',
    title: 'In Dialogue with Nature — Term Paper',
    context: 'Natural Sciences · GFN1000',
    status: 'Published',
    summary: '通识课程：与自然对话（GFN1000）。期末课程论文。',
    tags: ['Natural Sciences', 'GFN1000', 'Term Paper'],
    link: 'papers/GFN1000_In_Dialogue_with_Nature-TP.docx',
  },
]