"use strict";

function writeNews(title, author, publishedAt, newsUrl) {
  let contentNode = document.createElement("div");
  contentNode.setAttribute("class", "content");
  let titleNode = document.createElement("h1"); // 제목 생성
  titleNode.appendChild(document.createTextNode(title));

  let infoNode = document.createElement("p"); // 내용 생성
  infoNode.appendChild(
    document.createTextNode(`${author} - ${publishedAt} - `)
  );

  let linkNode = document.createElement("a"); // 기사 이동 링크
  linkNode.setAttribute("href", newsUrl);
  linkNode.setAttribute("target", "_blank");
  linkNode.appendChild(document.createTextNode(`more`));

  infoNode.appendChild(linkNode);

  contentNode.appendChild(titleNode); // 출력 전 합치는 코드
  contentNode.appendChild(infoNode);

  resultNode.appendChild(contentNode); // 결과에 출력
}

let search = document.getElementById("search");
let resultNode = document.getElementById("news-list");
let searchTxt = document.getElementById("search-txt");

search.addEventListener("click", function (e) {
  let xhr = new XMLHttpRequest();
  let url = `https://newsapi.org/v2/everything?q=${searchTxt.value}&sortBy=publishedAt&apiKey=389658f33e434183bf3506f5c89823d8`;
  console.log(url);
  xhr.open("get", url, true);
  xhr.onload = function () {
    let result = xhr.responseText;
    let resultObj = JSON.parse(result);
    writeNews(
      resultObj.articles[0].title,
      resultObj.articles[0].author,
      resultObj.articles[0].publishedAt,
      resultObj.articles[0].url
    );
  };
  xhr.send();
});

// alert(resultObj.articles[0].title);
