quote = (res) => {
    document.getElementById("quote").innerHTML = '"'+res.quoteText+'"';
    document.getElementById("author").innerHTML = res.quoteAuthor?"- "+res.quoteAuthor:"- Anonymous";
}