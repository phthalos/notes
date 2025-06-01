function formatToKSTString(utcISOString: string): string {
    const date = new Date(utcISOString);

    const kstDate = new Date(date.getTime());

    const year = kstDate.getFullYear();
    const month = String(kstDate.getMonth() + 1).padStart(2, "0");
    const day = String(kstDate.getDate()).padStart(2, "0");

    let hours = kstDate.getHours();
    const minutes = String(kstDate.getMinutes()).padStart(2, "0");
    const seconds = String(kstDate.getSeconds()).padStart(2, "0");

    const period = hours < 12 ? "오전" : "오후";
    hours = hours % 12;
    if (hours === 0) hours = 12;

    const formattedTime = `${year}년 ${month}월 ${day}일 ${period} ${String(hours).padStart(2, "0")}:${minutes}`;
    return formattedTime;
}

export default formatToKSTString;
