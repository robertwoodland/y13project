export default function incPageNum(pageNum, setPageNum, maxPageNum){
    if (pageNum + 1 < maxPageNum) {
        setPageNum((prevState) => prevState + 1)
    }
}