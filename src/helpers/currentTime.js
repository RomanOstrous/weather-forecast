export const formatDate = (date) => {
  const datePart = date.toLocaleDateString("uk", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const timePart = date.toLocaleTimeString("uk", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart}, ${timePart}`;
};

export const renderCurrentTime = () => {
  const nowElement = document.querySelector(".now");
  const currentTime = new Date();

  const formattedTime = formatDate(currentTime);
  nowElement.textContent = `Зараз: ${formattedTime}`;
};

setInterval(renderCurrentTime, 60000);
