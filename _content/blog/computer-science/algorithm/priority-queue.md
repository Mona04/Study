---
title: Priority Queue
description: Priority Queue 를 구현해보자.
date: 2024-12-05
tags: [ps, priority_queue]
---

## Binary Heap 버전

<details>
	<summary>코드</summary>

```c title="pq.cpp"
template<typename T, size_t Size>
struct PQ
{
	struct Node
	{
		friend bool operator<(const T& l, const Node& r) { return l < r.v; } // max first
		bool operator<(const Node& in) { return v < in; }
		T v;
	};
	Node heap[Size];
	int end = 1;

	void push(const T& in)
	{
		heap[end++].v = in;
		int cur = end - 1, next = cur >> 1;
		while (next && heap[next] < heap[cur])
		{
			swap(heap[next], heap[cur]);
			cur = next, next >>= 1;
		}		
	}
	
	T pop()
	{
		if (end <= 1) return {};
	
		T res = heap[1].v;
		heap[1].v = heap[--end].v;
		int cur = 1, next = cur << 1;
		while (next < end)
		{
			if (next+1 < end && heap[next] < heap[next+1]) next++;
			if (heap[next] < heap[cur]) break;
			swap(heap[cur], heap[next]);
			cur = next, next <<= 1;
		}
		return res;
	}
};
```

</details>

바이너리 Heap 을 사용해 우선순위 큐를 구현하였다.



## Binary Heap Plus 버전

<details>
	<summary>코드</summary>

```c title="pq.cpp"
template<typename T, size_t Size>
struct PQ
{
	struct Data { T v; struct PQ<T, Size>::Node* p; };
	struct Node
	{
		bool operator<(const Node& in) const { return data->v > in.data->v; }  // max first
		Data* data;
	};
	Node heap[Size];
	Data dp[Size];
	int end = 1;

	inline bool empty() const { return end <= 1; }
	inline T topValue() const { return heap[1].data->v; }
	inline int64_t topIndex() const { return heap[1].data - dp; }

	inline void Swap(int64_t a, int64_t b)
	{
		swap(heap[a], heap[b]);
		heap[a].data->p = &heap[a];  // swap 마다 heap 내 위치를 유지
		heap[b].data->p = &heap[b];
	}

	void increaseKey(const Data& data)  // bubble this key up 
	{
		if (data.p - heap >= end) return;
		auto cur = data.p - heap, next = cur >> 1;
		while (next && heap[next] < heap[cur])
		{
			Swap(cur, next);
			cur = next, next >>= 1;
		}
	}

	void push(const T& in)
	{
		heap[end].data = &dp[end];
		dp[end].v = in;
		dp[end].p = &heap[end]; end++;
		int cur = end - 1, next = cur >> 1;
		while (next && heap[next] < heap[cur])
		{
			Swap(cur, next);
			cur = next, next >>= 1;
		}
	}

	void pop()
	{
		if (end <= 1) return;

		heap[1].data = heap[--end].data;
		int cur = 1, next = cur << 1;
		while (next < end)
		{
			if (next + 1 < end && heap[next] < heap[next + 1]) next++;
			if (heap[next] < heap[cur]) break;
			Swap(cur, next);
			cur = next, next <<= 1;
		}
	}
};
```

</details>

위 코드에서 Heap 내의 요소를 바로 수정/조회 할 수 있게 변경한 버전.

Priority Queue 에서 정적인 배열 ```dp[]{:c}``` 가 있고 
각 데이터는 Heap 의 Node 와 연동이 되어서 우선순위 큐가 작동한다.

IncreaseKey() 가 핵심 기능으로
Data 를 외부에서 변화시킨 후
이 함수를 호출해서 heap 내부의 위치를 조정한다.