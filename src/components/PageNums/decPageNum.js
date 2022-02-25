export default function decPageNum(pageNum, setPageNum) {
    if (pageNum > 1) {
        setPageNum((prev) => prev - 1)
    }
}