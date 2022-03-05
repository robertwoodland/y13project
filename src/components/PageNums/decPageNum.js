export default function decPageNum(pageNum, setPageNum) {
    if (pageNum > 0) {
        setPageNum((prev) => prev - 1)
    }
}