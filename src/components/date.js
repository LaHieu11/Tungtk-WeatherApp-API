const EightDaysForecast = ({ dates }) => (
    <div>
        <h2>8 Ngày Liên Tiếp</h2>
        <ul>
            {dates.map((date, index) => (
                <li key={index}>
                    <p>Thứ {date.toLocaleDateString("en-US", { weekday: "long" })}</p>
                    <p>Ngày {date.toLocaleDateString()}</p>
                </li>
            ))}
        </ul>
    </div>
);


