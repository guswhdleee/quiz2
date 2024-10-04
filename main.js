"use strict";

function writeNews(title, author, publishedAt, newsUrl, imgUrl, newsInside) {
  let newsNode = document.createElement("div");
  newsNode.setAttribute("class", "news");
  let contentNode = document.createElement("div");
  contentNode.setAttribute("class", "content");
  let titleNode = document.createElement("h1"); // 제목 생성
  titleNode.appendChild(document.createTextNode(title));

  let infoNode = document.createElement("p"); // 기사 정보 노드 생성
  infoNode.appendChild(
    document.createTextNode(`${author} - ${publishedAt} - `)
  );

  let linkNode = document.createElement("a"); // 기사 이동 링크
  linkNode.setAttribute("href", newsUrl);
  linkNode.setAttribute("target", "_blank");
  linkNode.appendChild(document.createTextNode(`more`));
  infoNode.appendChild(linkNode);

  let imgDivNode = document.createElement("div"); // 이미지 노드
  let imgNode = document.createElement("img");
  imgNode.setAttribute("src", imgUrl);
  imgNode.setAttribute("class", "news-img");
  imgDivNode.appendChild(imgNode);

  let newsInsideNode = document.createElement("p"); // 기사 내용 노드
  newsInsideNode.appendChild(document.createTextNode(newsInside));

  contentNode.appendChild(titleNode); // 출력 전 합치는 코드
  contentNode.appendChild(infoNode);
  contentNode.appendChild(newsInsideNode);

  newsNode.appendChild(contentNode);
  newsNode.appendChild(imgDivNode);

  resultNode.appendChild(newsNode);
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
    for (let i = 0; i <= 2; i++)
      writeNews(
        resultObj.articles[i].title,
        resultObj.articles[i].author,
        resultObj.articles[i].publishedAt,
        resultObj.articles[i].url,
        resultObj.articles[i].urlToImage,
        resultObj.articles[i].description
      );
  };
  xhr.send();
});

// alert(resultObj.articles[0].title);
