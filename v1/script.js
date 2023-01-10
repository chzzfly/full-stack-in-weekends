"use strict";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// 1. 用户未点击发布时，隐藏表单，点击时，打开表单

const btnShareAFact = document.querySelector(".shareAFact");
const factForm = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

btnShareAFact.addEventListener("click", function () {
  factForm.classList.toggle("hidden");
  if (!factForm.classList.contains("hidden")) {
    btnShareAFact.textContent = "Close";
  } else btnShareAFact.textContent = "Share A Fact";
  // console.log("clicked");
});

// console.log(btnShareAFact);
// console.log(factForm);

// 1.1 自己使用原生的JS添加一个筛选按钮的功能，失败了，async的函数获取的数据不能直接使用，另外放在监听函数里也不能正常发挥作用。
// const btnScience = document.querySelector(".btn-science");

// btnScience.addEventListener("click", function () {
//   console.log("clicked");
//   async function loadFacts() {
//     const res = await fetch(
//       "https://pazyevznqbiqvbkvjcgv.supabase.co/rest/v1/facts",
//       {
//         headers: {
//           apikey:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhenlldnpucWJpcXZia3ZqY2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwOTIzNDEsImV4cCI6MTk4ODY2ODM0MX0.k1JnRT48wPKIq97-LukJQCD1WgL6T4fTUlrk5sWFAK8",
//           authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhenlldnpucWJpcXZia3ZqY2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwOTIzNDEsImV4cCI6MTk4ODY2ODM0MX0.k1JnRT48wPKIq97-LukJQCD1WgL6T4fTUlrk5sWFAK8",
//         },
//       }
//     );
//     const data = await res.json();
//     // console.log(data);
//     const filteredData = data.filter((fact) => fact.category === "science");
//     creatFactsList(filteredData);
//   }
// });

// 2. 创建dom元素，render the 获取的数据

factsList.innerHTML = "";

// creatFactsList(initialFacts);

// 从数据库中获取真实的数据

loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://pazyevznqbiqvbkvjcgv.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhenlldnpucWJpcXZia3ZqY2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwOTIzNDEsImV4cCI6MTk4ODY2ODM0MX0.k1JnRT48wPKIq97-LukJQCD1WgL6T4fTUlrk5sWFAK8",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhenlldnpucWJpcXZia3ZqY2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwOTIzNDEsImV4cCI6MTk4ODY2ODM0MX0.k1JnRT48wPKIq97-LukJQCD1WgL6T4fTUlrk5sWFAK8",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  creatFactsList(data);
  // const filteredData = data.filter((fact) => fact.category === "history");
  // creatFactsList(filteredData);
}

// 在外面调用函数获取的数据不是单纯的数组。
// const dataArr = loadFacts();
// console.log(dataArr);

//

// 获取并解析数据的函数，函数获得提升后，可以写在后面，可以在前面正常调用！
function creatFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
    <p>
      ${fact.text}
      <a
        class="source"
        href=${fact.source}
        target="_blank"
        >source</a
      >
    </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }"
      >${fact.category}</span
    >
  </li>`
  );

  // console.log(htmlArr);

  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

/* 解释数组的三种方法
// 返回符合条件的元素数组
console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
// 返回每个元素通过条件检验的值的数组
console.log([7, 64, 6, -23, 11].map((el) => el > 10));
// 返回通过条件的第一个元素
console.log([7, 64, 6, -23, 11].find((el) => el > 10));
*/

/* 解释JavaScript的基础
const [one, , three, four] = [2, 4, 6, 8].map(function (el) {
  return el * 10;
});

console.log(one, three, four);

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const allCategories = CATEGORIES.map((el) => el.name);
console.log(allCategories);
*/
