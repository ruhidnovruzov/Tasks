function readAndDisplayQueryParams(url) {
    const parsedUrl = new URL(url);

    const queryParams = parsedUrl.searchParams;
    // console.log(parsedUrl)
    // console.log(queryParams)
    queryParams.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });
}

const url = prompt("Enter a URL: ");
readAndDisplayQueryParams(url);
