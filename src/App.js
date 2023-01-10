import { useState } from "react";
import "./style.css";

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

/* 解释state
// learn state by create a counter计数器

function Counter() {
  let [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button
        className="btn btn-large"
        onClick={() => {
          console.log("clicked");
          // setCount()，里面需要一个值，而我给他一个值，这个值每次会加1
          setCount((count += 1));
        }}
      >
        +1
      </button>
    </div>
  );
}
*/

// 创建主组件App
function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Header，其实可以把这个当做一个单独的组件来做，会更清晰 */}
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? <NewFactForm /> : null}

      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </>
  );
}

// 头部组件

function Header(props) {
  //提示我们 props 是什么东西？
  // console.log(props);
  const { showForm, setShowForm } = props;

  const appTitle = "Today I learned";
  return (
    <header className="header">
      <div className="logo">
        <img src="./logo.png" alt="logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large shareAFact"
        onClick={
          () => setShowForm((show) => !show)
          //   {
          //   if (showForm === false) setShowForm(true);
          //   else setShowForm(false);
          // }
        }
      >
        {showForm ? "close" : "Share a fact"}
      </button>
    </header>
  );
}

// 表单组件
function NewFactForm() {
  return <form className="fact-form">Fact form</form>;
}

// 左侧分类组件按钮
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

function CategoryFilter() {
  const catG = CATEGORIES.map((cat) => (
    <li key={cat.name} className="category">
      <button
        className="btn btn-categories"
        style={{
          backgroundColor: cat.color,
        }}
      >
        {cat.name}
      </button>
    </li>
  ));

  // arr.map()返回的值应该还是一个数组，验证一下。确实是数组，但typeof是显示是对象
  // console.log(catG, typeof catG);
  // for (const el of catG) console.log(el);

  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {/* 将上面数组的每一个对象的name的值，作为名字，color作为颜色 */}
        {catG}
      </ul>
    </aside>
  );
}

// 右侧的新闻列表组件
function FactsList() {
  // 临时变量存放数据
  const facts = initialFacts;
  // 构建li数据块，箭头函数调用了另一个组件Fact()，即对数组中的每个元素使用Fact()函数进行处理
  // todo fact={fact} 这个是什么意思？再看一遍lecture！
  const factLi = facts.map((fact) => <Fact key={fact.id} fact={fact} />);
  return (
    <section>
      <ul className="facts-list">{factLi}</ul>
    </section>
  );
}

// 对facts数组里的每一个对象的处理，把数据弄成li的样子。
// {fact}代表的是 `const {fact} = props`，上面的fact数据传过来是props，暂时这么理解。fixme
function Fact({ fact }) {
  // const { factObj } = props;

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
