import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

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

alert("学习使用，请随意玩耍。");
// 创建主组件App
function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query
          .order("created_at", { ascending: false })
          .limit(1000);
        // console.log(facts);
        if (!error) setFacts(facts);
        else alert("There was a problem getting data.");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      {/* Header，其实可以把这个当做一个单独的组件来做，会更清晰。第10节这么做了，会涉及到props等知识比较复杂！ */}
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewFactForm
          facts={facts}
          setFacts={setFacts}
          setShowForm={setShowForm}
        />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactsList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="loadMessage">Loading...</p>;
}

// 头部组件

function Header(props) {
  //提示我们 props 是什么东西？就是在父组件中传下来的数据信息
  // console.log(props);
  const { showForm, setShowForm } = props;

  const appTitle = "Just for learning";
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

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

// console.log(isValidHttpUrl("http://baidu.com"));

// 表单组件
function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("https://example.com");
  const [category, setCategory] = useState("");
  const [isUpLoading, setIsUpLoading] = useState(false);
  const textLength = text.length;

  // 写一个提交函数
  async function handleSubmit(e) {
    // 1. 阻止页面刷新
    e.preventDefault();
    // 2. 检查数据是否合规，如果合规，创建一个新的fact
    // console.log(Boolean(text), source, category);
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // console.log("yes");
      // 3. 创建一个fact对象
      // const newFact = {
      //   id: Math.round(Math.random() * 10000),
      //   text: text, // equals text,
      //   source,
      //   category: category.toLowerCase(),
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      // console.log(newFact);
      //3. todo 将 newfact 上传到数据库中，获取最新的数据
      // 数据中的id ,created_at是自动生成的，三个投票默认是0，当setCategory确定category时，获取的value就是当时的字母，是大写的，转成小写就好了。
      setIsUpLoading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUpLoading(false);
      // console.log(newFact);

      // 4. 将新fact对象添加到UI中
      // const arr = function (facts) {
      //   return [newFact, ...facts];
      // };
      // console.log(arr());
      // setFacts(arr);
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      // setFacts(newFact);

      // 5. 重置输入框
      setText("");
      setSource("");
      setCategory("");
      // 6. 关闭输入表格框
      setShowForm(false);
    } else {
      alert(
        `😢输入的内容有误！\n请检查: \n  字数是否超过200，\n  网址是否正确，\n  类别是否选择。`
      );
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        disabled={isUpLoading}
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        disabled={isUpLoading}
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => {
          // 每次输入都会更新一次
          // console.log("inputSrc");
          setSource(e.target.value);
        }}
      />
      <select
        disabled={isUpLoading}
        value={category}
        onChange={(e) => setCategory(e.target.value.toLowerCase())}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name}>{cat.name.toUpperCase()}</option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUpLoading}>
        post
      </button>
    </form>
  );
}

// 左侧分类按钮组件

function CategoryFilter({ setCurrentCategory }) {
  const catG = CATEGORIES.map((cat) => (
    <li key={cat.name} className="category">
      <button
        className="btn btn-categories"
        style={{
          backgroundColor: cat.color,
        }}
        onClick={() => setCurrentCategory(cat.name)}
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
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {/* 将上面数组的每一个对象的name的值，作为名字，color作为颜色 */}
        {catG}
      </ul>
    </aside>
  );
}

// 右侧的新闻列表组件
function FactsList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="loadMessage">
        No facts for this category yet! Create the first one.
      </p>
    );
  }

  // 构建li数据块，箭头函数调用了另一个组件Fact()，即对数组中的每个元素使用Fact()函数进行处理
  //  fact={fact} 这个是什么意思？再看一遍lecture！解构的意思。已完成！
  const factLi = facts.map((fact) => (
    <Fact key={fact.id} fact={fact} setFacts={setFacts} />
  ));
  return (
    <section>
      <ul className="facts-list">{factLi}</ul>
    </section>
  );
}

// 对facts数组里的每一个对象的处理，把数据弄成li的样子。
// {fact}代表的是 `const {fact} = props`，上面的fact数据传过来是props，暂时这么理解。fixme
function Fact({ fact, setFacts }) {
  // const { fact,setFacts } = props;
  const [isUpdating, setIsUpDating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpDating(true);
    // console.log("clicked");
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpDating(false);
    // todo 获取的数据是什么啊？这一row的数据
    // console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[此条有争议]</span> : null}
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

      {/* fixme 这个find函数本身已经在正常工作了，但是当新数据产生时，它就不正常了，说明新数据的category有点问题。当我们指定value时是可以正常工作的，但是输入时就不正常了，说明选择输入category的时候出了问题。
       */}
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
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
