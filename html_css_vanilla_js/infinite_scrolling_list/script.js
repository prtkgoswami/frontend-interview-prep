document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Ready")

    const listContainer = document.querySelector('#list-container');
    const loadMoreIndicator = document.querySelector('#list-load-more-indicator');
    const queryItemCount = 10;
    let currItemCount = 0;
    let totalItems = -1;
    let isFetching = false;
    const observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting && !isFetching)
            getListItems();
    });
    observer.observe(loadMoreIndicator);

    function createListElement(title, price) {
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");
        listItem.setAttribute("role", "listitem")
        const titlePara = document.createElement('p');
        titlePara.textContent = title;
        const pricePara = document.createElement('p');
        pricePara.textContent = "$" + price;
        listItem.appendChild(titlePara);
        listItem.appendChild(pricePara);
        return listItem;
    }

    async function fetchItems() {
        try {
            isFetching = true;
            console.log("fetching Data:: count:", queryItemCount, " skip:", currItemCount, " currItemCount:", currItemCount, "/", totalItems);
            const response = await fetch(`https://dummyjson.com/products?limit=${queryItemCount}&skip=${currItemCount}&select=title,price`);

            if (!response.ok) {
                throw new Error("Failed to fetch items");
            }

            const data = await response.json();
            return { items: data.products, totalCount: data.total };
        } catch (err) {
            console.error("Failed to fetch items");
            return { items: [], totalCount: -1 };
        } finally {
            isFetching = false;
        }
    }

    async function getListItems() {
        const { items: newItems, totalCount } = await fetchItems();

        if (totalItems === -1)
            totalItems = totalCount;

        currItemCount += newItems.length;
        listContainer.removeChild(loadMoreIndicator);
        newItems.forEach(({ title, price }) => {
            const listItem = createListElement(title, price);
            listContainer.appendChild(listItem);
        })

        if (currItemCount >= totalItems) {
            observer.unobserve(loadMoreIndicator);
            return;
        }

        listContainer.appendChild(loadMoreIndicator);
    }
})