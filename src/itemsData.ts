import type { Item } from './types/item';
import laptopImg from "./assets/imgs/laptop.jpeg";
import smartphoneImg from "./assets/imgs/smartphone.jpeg";
import headphonesImg from "./assets/imgs/headphones.jpeg";
import iphoneImg from "./assets/imgs/b_1.jpg";
import hoodieImg from "./assets/imgs/b_2.jpg";
import hoodie2Img from "./assets/imgs/b_3.jpg";
import hoodie3Img from "./assets/imgs/b_4.jpg";
import macbookImg from "./assets/imgs/b_5.jpg";
import coffieImg from "./assets/imgs/b_6.jpg";
import pspImg from "./assets/imgs/b_7.jpg";
import lenovo from './assets/imgs/lenovo.png'


export const itemsData: Item[] = [
    {
        id: 1,
        product: "מחשב נייד HP Laptop 15-FD0090NJ / C8BX7EA - צבע Natural silver",
        price: 999,
        img: laptopImg,
        info: "מחשב נייד מבית HP בגודל ''15.6 ברזולוציית FHD (1920x1080), מעבד Intel® Core™ i3-1315U, זיכרון פנימי בנפח 8GB, כונן SSD בנפח 512GB וכולל מערכת הפעלה.",
    },
    {
        id: 2,
        product:
            "אוזניות סוני בלוטוס אלחוטיות - מבטלות רעשים כולל חיבור 3.5 mm - צבע שחור - Sony WH1000XM5B",
        price: 199,
        img: headphonesImg,
        info: "אוזניות קשת אלחוטיות Accentum מבית Sennheiser הן הדור הבא באוזניות האלחוטיות המספקות את חתימת הסאונד של Sennheiser באיכות סאונד מעולה וכוללות מצב ביטול רעשים אקטיבי.",
    },
    {
        id: 3,
        product:
            "אייפון Apple iPhone 17 Pro Max 256GB צבע Deep Blue - שנה אחריות יבואן רשמי - ללא מטען וללא אוזניות",
        price: 799,
        img: smartphoneImg,
        info: "iPhone 17 Pro Max העוצמתי מבית Apple, בעל מסך 6.9 אינץ' Super Retina XDR, עם חיישן זיהוי פנים, מעבד ראשי A19 Pro עוצמתי, שלוש מצלמות אחוריות 48 מגה פיקסל, מצלמת סלפי 18 מגה פיקסל, אפשרות טעינה אלחוטית ותמיכה ברשת הדור החמישי 5G.",
    },
    {
        id: 4,
        product:
            "אייפון Apple אייפון Apple iPhone 17 Pro 256GB - צבע Silver - שנה אחריות יבואן רשמי - ללא מטען וללא אוזניות 17 Pro Max 256GB צבע Deep Blue - שנה אחריות יבואן רשמי - ללא מטען וללא אוזניות",
        price: 4948,
        img: iphoneImg,
        info: "iPhone 17 Pro העוצמתי מבית Apple, בעל מסך 6.3 אינץ' Super Retina XDR, עם חיישן זיהוי פנים, מעבד ראשי A19 Pro עוצמתי, שלוש מצלמות אחוריות 48 מגה פיקסל, מצלמת סלפי 18 מגה פיקסל, אפשרות טעינה אלחוטית ותמיכה ברשת הדור החמישי 5G.",
    },
    {
        id: 5,
        product: "קפוצון לנשים עם רוכסן Marvel Spider Gwen - מידה M",
        price: 131,
        img: hoodieImg,
        info: "קפוצ' Marvel Loki הביעו את אהבתכם לדמויות האהובות עליכם עם קפוצון נוח ומעוצב. פריט אופנה פופולרי בקרב ילדים ומבוגרים כאחד ומהווה דרך נהדרת להביע אהדה למותגים האהובים.",
    },
    {
        id: 6,
        product: "קפוצון לנשים עם רוכסן Marvel Spider Gwen - מידה M",
        price: 131,
        img: hoodie2Img,
        info: "קפוון Marvel Spider Gwen הביעו את אהבתכם לדמויות האהובות עליכם עם קפוצון נוח ומעוצב. פריט אופנה פופולרי בקרב ילדים ומבוגרים כאחד ומהווה דרך נהדרת להביע אהדה למותגים האהובים.",
    },
    {
        id: 7,
        product: "קפוצ'ון לגברים Marvel Avengers - מידה XL",
        price: 131,
        img: hoodie3Img,
        info: "קפוצון Marvel Avengers הביעו את אהבתכם לדמויות האהובות עליכם עם קפוצון נוח ומעוצב. פריט אופנה פופולרי בקרב ילדים ומבוגרים כאחד ומהווה דרך נהדרת להביע אהדה למותגים האהובים.",
    },
    {
        id: 8,
        product:
            "מחשב Apple MacBook Air 13 M4 Chip 10-Core CPU, 10-Core GPU, 512GB SSD Storage, 16GB Unified Memory - צבע Midnight - מקלדת עברית / אנגלית - דגם MW133HB/A",
        price: 4948,
        img: macbookImg,
        info: "הכירו את ה-MacBook Air החדש מבית Apple  דק יותר, מהיר מתמיד ועוצמתי להפליא, הודות לשבב החדש והמתקדם מבית Apple. עם ביצועים פורצי דרך, חיי סוללה חסרי תקדים ועיצוב אלגנטי וקל במיוחד, הוא מושלם לעבודה, לימודים ויצירה ללא גבולות. כל מה שאתם אוהבים ב-Mac, עכשיו במהירות וביעילות שלא הכרתם.",
    },
    {
        id: 9,
        product:
            "מכונת קפה Nespresso Inissia D40 - צבע שחור - שנה אחריות יבואן רשמי",
        price: 437,
        img: coffieImg,
        info: "חובבי קפה המחפשים מכונת קפה קומפקטית ואופנתית מבלי להתפשר על הטעם?. Inissia, מכונת קפה מבוססת קפסולות, מתאימה לכל חלל בביתכם בזכות גודלה הקומפקטי. היא גם מסוגלת להכין שני גדלי כוסות מתכווננים: אספרסו ולונגו, שניהם עם טעם יוצא דופן.",
    },
    {
        id: 10,
        product:
            "מחשב גיימינג נייד Lenovo Legion Go Gen 2 8ASP2 83N0001DIV - בנפח 512GB - צבע Eclipse Black - כולל נרתיק נשיאה בתוך האריזה - שלוש שנות אחריות",
        price: 4989,
        img: pspImg,
        info: "הכירו את Legion Go Gen 2 - הדור הבא של מחשב הגיימינג הנייד עטור הפרסים מבית Lenovo. עם בקרים ניתנים להסרה, מסך OLED עוצר נשימה בגודל 8.8 אינץ’ ובקצב רענון 144Hz, וסוללה עוצמתית ליותר זמן משחק - זהו הכוח והגמישות במיטבם, לכל מקום שתרצו לשחק בו.",
    }, {
        id: 11,
        product:
            "מחשב נייד IdeaPad Slim 3 15IRH10 מבית Lenovo המחשב מצויד במעבד Intel Core i7-13620H, מסך WUXGA (1920x1200) IPS בגודל 15.3 אינץ', כרטיס מסך Integrated Intel UHD Graphics ומערכת ההפעלה Windows 11 Home, המציעה ממשק משתמש מודרני ונוח לשימוש בעברית ובאנגלית",
        price: 3000,
        img: lenovo,
        info: "הכירו את Legion Go Gen 2 - הדור הבא של מחשב הגיימינג הנייד עטור הפרסים מבית Lenovo. עם בקרים ניתנים להסרה, מסך OLED עוצר נשימה בגודל 8.8 אינץ’ ובקצב רענון 144Hz, וסוללה עוצמתית ליותר זמן משחק - זהו הכוח והגמישות במיטבם, לכל מקום שתרצו לשחק בו.",

    }
];