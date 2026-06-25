# Stage 1: Priority Inbox Notification System Design

## 1. Approach & Priority Algorithm
To efficiently manage a high volume of incoming campus notifications without overloading the user, a custom ranking formula was engineered. The application assigns custom numerical importance weights to different categories:
* **Placement notifications:** Weight = 3 (Highest critical importance)
* **Result notifications:** Weight = 2 (Moderate importance)
* **Event notifications:** Weight = 1 (General update importance)

### Formula Engine
A combined sorting priority score is calculated dynamically using the formula:
$$\text{Priority Score} = (\text{Category Weight} \times 10^{12}) + \text{Epoch Timestamp}$$

By scaling the category weight up by a massive factor ($10^{12}$), we ensure that high-priority notification types consistently anchor to the top of the feed over lower priority groups, while remaining correctly sorted chronologically (by recency timestamp) within their respective weight classes.

## 2. Technical Efficiency & Data Handling
* **$O(N \log N)$ Sorting Execution:** The engine takes the loaded raw stream and computes scores inline, applying JavaScript’s native Timsort array sorting mechanics to position elements before extracting the exact Top 10 segment using an optimal `.slice(0, 10)` boundary.
* **Stateless Operations:** Per the criteria guidelines, data streams are directly loaded into active operational React state via hooks upon screen paint, bypassing structural database storage entirely to maximize frontend throughput.

## 3. Production Best Practices & Logging Observability
* **Logging Middleware Architecture:** An asynchronous logger is strategically invoked across the application lifecycle (firing distinct info logs during API request preparation, successful responses, and component state mapping).
* **Error Containment:** The application wraps pipeline fetches in structured `try-catch` structures, firing critical or fatal severity logs to the server if networking issues arise.