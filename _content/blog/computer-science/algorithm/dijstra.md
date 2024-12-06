---
title: Dijkstra Algorithm
description: dijkstra 를 이해하고 구현해보자.
date: 2024-12-04
tags: [ps, dijkstra]
---

## 설명

Dijkstra 는 시작점으로부터 __나머지 모든 정점에 대한 거리를 구하는__ 알고리즘이다. 

단 __간선의 가중치가 음수가 아니어야__ 한다. 만약 음수를 포함한다면 무한루프를 돌게 된다.

알고리즘은 대락 다음과 같다.
1. 일차원 정수 배열인 ```dp[]{:cpp}``` 를 두어 전부 무한대 값을 할당한다.
2. 출발 정점 인덱스를 ```s{:cpp}``` 라고 할 때 ```dp[s] = 0{:cpp}``` 으로 할당한다. 그리고 ```s{:cpp}``` 와 인접한 정점을 컨테이너에 담는다.
3. 컨테이너 안의 정점이 없을 때 까지 루프를 돈다.
	1. 가장 작은 ```dp[u]{:cpp}``` 를 갖는 컨테이너 안의 정점 ```u{:cpp}``` 를 꺼낸다.
	2. ```u{:cpp}``` 와 인접한 정점 ```v{:cpp}``` 를 잇는 간선의 최소가중치가 ```edge(u,v){:cpp}``` 라고 하자. ```dp[v] > dp[u] + edge(u,v){:cpp}``` 라면
		1. ```dp[v] = dp[u] + edge(u,v){:cpp}``` 를 수행한다. 
		2. ```v{:cpp}``` 를 컨테이너에 넣는다.
4. ```dp[]{:cpp}``` 의 값은 방문 가능한 경우 최단거리 그렇지 않은 경우 무한대가 된다.

아이디어는 Gridy + DP 라고 생각할 수도 있다.


### 시간복잡도

|수단|시간복잡도|
|:-:|:-:|
|배열+루프                |$$\mathrm{O}(\vert V \vert ^2)$$|
|Edge 에 대해 우선순위 큐   |$$\mathrm{O}(\vert E \vert \log{\vert E \vert})$$|
|Vertex 에 대해 우선순위 큐 |$$\mathrm{O}(\vert E \vert \log{\vert V \vert})$$|
|피보나치 큐               |$$\mathrm{O}(\vert E \vert + \vert V \vert \log{\vert V \vert})$$|

위의 절차의 1.3.1 단계에서 가장 작은 값을 어떻게 찾는 지가 중요하다. 그 방법에 따라 위와 같이 시간복잡도가 달라진다.

## 증명

> ### Loop Invariant
> <hr/>
> 임의의 방문한 정점인 $$v$$ 에 대하여 
> $$\text{dp}[v]$$  는 $$v$$ 까지의 최단거리이고,
> <br/>
> 임의의 방문하지 않은 정점인 $$u$$ 에 대하여
> $$\text{dp}[u]$$  는 방문한 점만을 거쳤을 때의 $$u$$ 까지의 최단거리이다.

이때 방문한다는 말의 의미는 
1. 시작점이거나 
2. 위 알고리즘에 의해 해당 정점이 가진 간선에 대하여 계산을 한 경우

를 말한다.

#### Base case 

시작점 $$s$$ 에 대해 $$\text{dp}[s]$$ 는 초기 세팅으로 0 이 된다. 자기 자신과의 거리는 0 이므로 이 값은 최단거리가 자명하다.

#### Inductive Step

$$k$$ 개의 정점에 대하여 탐색이 완료되었을 때 $$k+1$$ 에서도 위 알고리즘이 Loop Invariant 를 만족시킴을 보이면 된다. 이는 크게 3단계로 나눌 수 있다.

+ $$u$$ 를 이번에 탐색할 정점이라고 하자. $$\text{dp}[u]$$  값이 최단거리임을 보이자
	+ 귀류법을 사용하여 $$\text{dp}[u]$$ 가 최단거리가 아니라고 하자. Loop Invariant 상 이 값은 $$k$$ 개의 정점들만 사용한 경로의 최단거리이다. 이 경로가 전체 정점을 고려한 최단경로가 아니라면 탐색된 $$k$$ 개의 정점 외의 다른 정점을 지나야한다. 이 중 최초로 방문하지 않은 정점을 $$w$$ 라고 하자. 그러면 $$\text{dp}[u] > \text{dp}[w] + \text{dist}[w, u]$$ 라고 할 수 있다. $$\text{dist}[w, u]$$ 는 음이 아니므로 $$\text{dp}[u] > \text{dp}[w]$$ 가 성립한다. 그러면 모순이 발생하는데 $$\text{dp}[u]$$ 가 더 크다면 $$w$$ 가 이번에 탐색될 정점이기 때문이다. 증명완료.
+ $$u$$ 와 인접한 정점 $$v$$에 대하여 $$\text{dp}[v]$$ 가 갱신이 된다. $$\text{dp}[v]$$ 가 $$u$$ 를 포함한 방문한 정점들만 이용한 최단거리임을 보이자.
	+ 방문한 정점만을 사용한 $$v$$ 까지의 최단경로가 $$u$$ 를 포함하지 않는다고 해보자. 그럼 갱신하기 전부터 이미 방문한 정점만을 사용한 최단거리이다. 반대로 포함한다고 해보자. 그러면 기존 값보다 더 짧아졌으니 더이상 짧을 수가 없다. 증명완료.
+ 나머지 $$\text{dp}$$ 값들은 변하지도 영향을 받지도 않으므로 생략.

## Sample Code

<details>
	<summary>예제 코드 1</summary>

```c title="dijkstra.cpp"
struct E { 
	int d; // Destination
	int d; // Weight
};

namespace std {
	template<> struct greater<E> {
		bool operator()(const E& a, const E& b) const { return a.w > b.w; }
	};
}

vector<E> lines[MAX_IN]; 
int dp[MAX_IN];
int n; // vertex count

void Dijkstra(int start)
{
	fill(dp, dp + n + 1, INFINITY);
	priority_queue<E, vector<E>, greater<E>> q;
	dp[start] = 0; q.push({start, 0});

	while (!q.empty())
	{
		E cur = q.top(); q.pop();
		if (dp[cur.d] < cur.w) continue;  // filter out an outdated edge
		for (E& l : lines[cur.d])
		{
			if (dp[cur.d] + l.w < dp[l.d])
			{
				dp[l.d] = dp[cur.d] + l.w;
				q.push({ l.d, dp[l.d] });
			}
		}
	}
}
```

</details>

위 코드는 Edge 에 대해 우선순위 큐를 사용한 코드이다. 구현이 쉬운 장점이 있다.

<details>
	<summary>예제 코드 2</summary>

```c title="dijkstra.cpp"
const int MAX_IN = 50001;
const int INF = 1e9;
int n; // vertex count
std::vector<std::vector<std::pair<int, int>>> lines;

int Dijkstra(int start, int dest)
{
	PQ<int, MAX_IN> q;
	for (int i = 0; i < n; i++) q.push(INF);
	q.dp[start].v = 0;
	q.increaseKey(q.dp[1]);

	while (!q.empty())
	{
		auto cur = q.topIndex(); q.pop();

		for (const auto& v : lines[cur])
		{
			if (q.dp[cur].v + v.second < q.dp[v.first].v) {
				q.dp[v.first].v = q.dp[cur].v + v.second;
				q.increaseKey(q.dp[v.first]);
			}
		}
	}

	return q.dp[dest].v;
}
```

</details>

위 코드는 Vertex 에 대해 우선순위 큐를 사용한 코드이다. 
```PQ{:c}``` 는 [여기](./priority-queue) 를 참고.

## 예제

### [백준 5972](https://www.acmicpc.net/problem/5972)

<details>
	<summary>코드</summary>

```c++ title="main.cpp"
const int MAX_IN = 50001;
const int INF = 1e9;
int n, m;
int dp[MAX_IN];
std::vector<std::vector<std::pair<int, int>>> roads;

void Dijkstra(int start, int dest, int* dp)
{
	priority_queue<std::pair<int, int>> q;
	q.push({ 0, start });

	fill(dp, dp + n + 1, INF);
	dp[start] = 0;

	while (!q.empty())
	{
		auto cur = q.top(); q.pop();
		if (-dp[cur.second] < cur.first) continue;  // out of updated edge

		for (const auto& v : roads[cur.second])
		{
			if (dp[cur.second] + v.second < dp[v.first]) {
				dp[v.first] = dp[cur.second] + v.second;
				q.push({ -dp[v.first], v.first });
			}
		}
	}
}

int main()
{
	cin >> n >> m;
	roads.resize(n + 1);
	for (int i = 0; i < m; i++) {
		int a, b, c, maxab;
		cin >> a >> b >> c;
		roads[a].push_back({ b,c });
		roads[b].push_back({ a,c });
	}
	Dijkstra(1, n, dp);

	cout << dp[n];
}
```
</details>