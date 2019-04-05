import acrobatmac from "@/shortcuts/acrobat-mac.json";
import acrobatwin from "@/shortcuts/acrobat-win.json";
import asana from "@/shortcuts/asana.json";
import dropbox from "@/shortcuts/dropbox.json";
import excelmac from "@/shortcuts/excel-mac.json";
import excelwin from "@/shortcuts/excel-win.json";
import googlechromemac from "@/shortcuts/google-chrome-mac.json";
import googlechromewin from "@/shortcuts/google-chrome-win.json";
import googledocsmac from "@/shortcuts/google-docs-mac.json";
import googledocswin from "@/shortcuts/google-docs-win.json";
import googledrive from "@/shortcuts/google-drive.json";
import googlemailmac from "@/shortcuts/google-mail-mac.json";
import googlemailwin from "@/shortcuts/google-mail-win.json";
import googleslides from "@/shortcuts/google-slides.json";
import googlespreadsheets from "@/shortcuts/google-spreadsheets.json";
import illustratormac from "@/shortcuts/illustrator-mac.json";
import illustratorwin from "@/shortcuts/illustrator-win.json";
import outlookmac from "@/shortcuts/outlook-mac.json";
import outlookwin from "@/shortcuts/outlook-win.json";
import photoshopmac from "@/shortcuts/photoshop-mac.json";
import photoshopwin from "@/shortcuts/photoshop-win.json";
import premieremac from "@/shortcuts/premiere-mac.json";
import premierewin from "@/shortcuts/premiere-win.json";
import powerpointmac from "@/shortcuts/powerpoint-mac.json";
import powerpointwin from "@/shortcuts/powerpoint-win.json";
import wordmac from "@/shortcuts/word-mac.json";
import wordwin from "@/shortcuts/word-win.json";

export const shortcuts = {
  acrobatmac,
  acrobatwin,
  asana,
  dropbox,
  excelmac,
  excelwin,
  googlechromemac,
  googlechromewin,
  googledocsmac,
  googledocswin,
  googledrive,
  googlemailmac,
  googlemailwin,
  googleslides,
  googlespreadsheets,
  illustratormac,
  illustratorwin,
  outlookmac,
  outlookwin,
  photoshopmac,
  photoshopwin,
  premieremac,
  premierewin,
  powerpointmac,
  powerpointwin,
  wordmac,
  wordwin
};

export const softwares = {
  acrobatmac: [],
  acrobatwin: [],
  asana: [],
  dropbox: [],
  excelmac: [],
  excelwin: [],
  googlechromemac: [],
  googlechromewin: [],
  googledocsmac: [],
  googledocswin: [],
  googledrive: [],
  googlemailmac: [],
  googlemailwin: [],
  googleslides: [],
  googlespreadsheets: [],
  illustratormac: [],
  illustratorwin: [],
  outlookmac: [],
  outlookwin: [],
  photoshopmac: [],
  photoshopwin: [],
  premieremac: [],
  premierewin: [],
  powerpointmac: [],
  powerpointwin: [],
  wordmac: [],
  wordwin: []
};

export const category = ["Productivity", "Collaboration", "Design", "Utility"];

const list = [
  {
    name: "Acrobat",
    platform: "mac",
    file: "acrobat-mac",
    var: "acrobatmac",
    category: "Utility"
  },
  {
    name: "Acrobat",
    platform: "windows",
    file: "acrobat-win",
    var: "acrobatwin",
    category: "Utility"
  },
  {
    name: "Asana",
    platform: "all",
    file: "asana",
    var: "asana",
    category: "Collaboration"
  },
  {
    name: "Dropbox",
    platform: "all",
    file: "dropbox",
    var: "dropbox",
    category: "Collaboration"
  },
  {
    name: "Excel",
    platform: "mac",
    file: "excel-mac",
    var: "excelmac",
    category: "Productivity"
  },
  {
    name: "Excel",
    platform: "windows",
    file: "excel-win",
    var: "excelwin",
    category: "Productivity"
  },
  {
    name: "Chrome",
    platform: "mac",
    file: "google-chrome-mac",
    var: "googlechromemac",
    category: "Utility"
  },
  {
    name: "Chrome",
    platform: "windows",
    file: "google-chrome-win",
    var: "googlechromewin",
    category: "Utility"
  },
  {
    name: "Google Docs",
    platform: "mac",
    file: "google-docs-mac",
    var: "googledocsmac",
    category: "Collaboration"
  },
  {
    name: "Google Docs",
    platform: "windows",
    file: "google-docs-win",
    var: "googledocswin",
    category: "Collaboration"
  },
  {
    name: "Google Drive",
    platform: "all",
    file: "google-drive",
    var: "googledrive",
    category: "Collaboration"
  },
  {
    name: "Google Mail",
    platform: "mac",
    file: "google-mail-mac",
    var: "googlemailmac",
    category: "Productivity"
  },
  {
    name: "Google Mail",
    platform: "windows",
    file: "google-mail-win",
    var: "googlemailwin",
    category: "Productivity"
  },
  {
    name: "Google Slides",
    platform: "all",
    file: "google-slides",
    var: "googleslides",
    category: "Productivity"
  },
  {
    name: "Google Spreadsheets",
    platform: "all",
    file: "google-spreadsheets",
    var: "googlespreadsheets",
    category: "Productivity"
  },
  {
    name: "Illustrator",
    platform: "mac",
    file: "illustrator-mac",
    var: "illustratormac",
    category: "Design"
  },
  {
    name: "Illustrator",
    platform: "windows",
    file: "illustrator-win",
    var: "illustratorwin",
    category: "Design"
  },
  {
    name: "Outlook",
    platform: "mac",
    file: "outlook-mac",
    var: "outlookmac",
    category: "Productivity"
  },
  {
    name: "Outlook",
    platform: "windows",
    file: "outlook-win",
    var: "outlookwin",
    category: "Productivity"
  },
  {
    name: "Photoshop",
    platform: "mac",
    file: "photoshop-mac",
    var: "photoshopmac",
    category: "Design"
  },
  {
    name: "Photoshop",
    platform: "windows",
    file: "photoshop-win",
    var: "photoshopwin",
    category: "Design"
  },
  {
    name: "Premiere",
    platform: "mac",
    file: "premiere-mac",
    var: "premieremac",
    category: "Design"
  },
  {
    name: "Premiere",
    platform: "windows",
    file: "premiere-win",
    var: "premierewin",
    category: "Design"
  },
  {
    name: "Powerpoint",
    platform: "mac",
    file: "powerpoint-mac",
    var: "powerpointmac",
    category: "Productivity"
  },
  {
    name: "Powerpoint",
    platform: "windows",
    file: "powerpoint-win",
    var: "powerpointwin",
    category: "Productivity"
  },
  {
    name: "Word",
    platform: "mac",
    file: "word-mac",
    var: "wordmac",
    category: "Productivity"
  },
  {
    name: "Word",
    platform: "windows",
    file: "word-win",
    var: "wordwin",
    category: "Productivity"
  }
];

export default list;
