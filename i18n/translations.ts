
export const translations = {
  zh: {
    // Header
    schoolName: '育新学校',
    celebrationName: '百年校庆',
    navSearch: '座位查询',
    navAdmin: '管理后台',
    // Home Page
    title: '座位查询系统',
    welcome: '欢迎参加育新学校百年校庆庆典',
    searchPlaceholder: '请输入您的英文姓名...',
    searchPlaceholderHelper: '请输入您的英文姓名进行查询。',
    seatNumberLabel: '座位号',
    loadingData: '正在加载数据...',
    noDataTitle: '暂无数据',
    noDataBody: '座位数据尚未上传，请稍后重试或联系管理员。',
    notFoundTitle: '未找到结果',
    notFoundBody: '无法找到与“{query}”匹配的记录，请检查您的输入。',
    // Footer
    footerText: `&copy; {year} 育新学校. All Rights Reserved.`,
  },
  en: {
    // Header
    schoolName: 'SJK(C) Yok Sin',
    celebrationName: ' 100th Anniversary',
    navSearch: 'Seat Inquiry',
    navAdmin: 'Admin Panel',
    // Home Page
    title: 'Seating Inquiry System',
    welcome: "Welcome to SJK(C) Yok Sin's 100th Anniversary Celebration",
    searchPlaceholder: 'Please enter your English name...',
    searchPlaceholderHelper: 'Please enter your English name to search.',
    seatNumberLabel: 'Seat Number',
    loadingData: 'Loading data...',
    noDataTitle: 'No Data Available',
    noDataBody: 'Seating data has not been uploaded yet. Please try again later or contact the administrator.',
    notFoundTitle: 'No Results Found',
    notFoundBody: 'Could not find a record matching "{query}". Please check your input.',
    // Footer
    footerText: `&copy; {year} SJK(C) Yok Sin. All Rights Reserved.`,
  },
  ms: {
    // Header
    schoolName: 'SJK(C) Yok Sin',
    celebrationName: ' Ulang Tahun ke-100',
    navSearch: 'Pertanyaan Tempat Duduk',
    navAdmin: 'Panel Pentadbir',
    // Home Page
    title: 'Sistem Pertanyaan Tempat Duduk',
    welcome: 'Selamat Datang ke Sambutan Ulang Tahun ke-100 SJK(C) Yok Sin',
    searchPlaceholder: 'Sila masukkan nama Inggeris anda...',
    searchPlaceholderHelper: 'Sila masukkan nama Inggeris anda untuk mencari.',
    seatNumberLabel: 'Nombor Tempat Duduk',
    loadingData: 'Memuatkan data...',
    noDataTitle: 'Tiada Data',
    noDataBody: 'Data tempat duduk belum dimuat naik. Sila cuba lagi nanti atau hubungi pentadbir.',
    notFoundTitle: 'Tiada Keputusan Ditemui',
    notFoundBody: 'Tidak dapat mencari rekod yang sepadan dengan "{query}". Sila semak input anda.',
    // Footer
    footerText: `&copy; {year} SJK(C) Yok Sin. Hak Cipta Terpelihara.`,
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['zh'];
