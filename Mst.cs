using System;
using System.Collections.Generic;
using System.Linq;

namespace GraphAlgorithmTesting
{
  class Program
  {
    static void Main(string[] args)
    {
      Graph g = new Graph(9);
      g.AddEdge(0, 1, 4);
      g.AddEdge(0, 7, 8);
      g.AddEdge(1, 2, 8);
      g.AddEdge(1, 7, 11);
      g.AddEdge(2, 3, 7);
      g.AddEdge(2, 5, 4);
      g.AddEdge(8, 2, 2);
      g.AddEdge(3, 4, 9);
      g.AddEdge(3, 5, 14);
      g.AddEdge(5, 4, 10);
      g.AddEdge(6, 5, 2);
      g.AddEdge(8, 6, 6);
      g.AddEdge(7, 6, 1);
      g.AddEdge(7, 8, 7);

      Console.WriteLine();
      Console.WriteLine("Graph Vertex Count : {0}", g.VertexCount);
      Console.WriteLine("Graph Edge Count : {0}", g.EdgeCount);
      Console.WriteLine();

      //Console.WriteLine("Is there cycle in graph: {0}", g.HasCycle());
      Console.WriteLine();

      Edge[] mst = g.Kruskal();
      Console.WriteLine("MST Edges:");
      foreach (var edge in mst)
      {
        Console.WriteLine("\t{0}", edge);
      }

      Console.ReadKey();
    }

    class Edge
    {
      public Edge(int begin, int end, int weight)
      {
        this.Begin = begin;
        this.End = end;
        this.Weight = weight;
      }

      public int Begin { get; private set; }
      public int End { get; private set; }
      public int Weight { get; private set; }

      public override string ToString()
      {
        return string.Format(
          "Begin[{0}], End[{1}], Weight[{2}]",
          Begin, End, Weight);
      }
    }

    class Subset
    {
      public int Parent { get; set; }
      public int Rank { get; set; }
    }

    class Graph
    {
      private Dictionary<int, List<Edge>> _adjacentEdges
        = new Dictionary<int, List<Edge>>();

      public Graph(int vertexCount)
      {
        this.VertexCount = vertexCount;
      }

      public int VertexCount { get; private set; }

      public IEnumerable<int> Vertices { get { return _adjacentEdges.Keys; } }

      public IEnumerable<Edge> Edges
      {
        get { return _adjacentEdges.Values.SelectMany(e => e); }
      }

      public int EdgeCount { get { return this.Edges.Count(); } }

      public void AddEdge(int begin, int end, int weight)
      {
        if (!_adjacentEdges.ContainsKey(begin))
        {
          var edges = new List<Edge>();
          _adjacentEdges.Add(begin, edges);
        }
        
        _adjacentEdges[begin].Add(new Edge(begin, end, weight));
      }

      private int Find(Subset[] subsets, int i)
      {
        // find root and make root as parent of i (path compression)
        if (subsets[i].Parent != i)
          subsets[i].Parent = Find(subsets, subsets[i].Parent);

        return subsets[i].Parent;
      }

      private void Union(Subset[] subsets, int x, int y)
      {
        int xroot = Find(subsets, x);
        int yroot = Find(subsets, y);

        // Attach smaller rank tree under root of high rank tree
        // (Union by Rank)
        if (subsets[xroot].Rank < subsets[yroot].Rank)
          subsets[xroot].Parent = yroot;
        else if (subsets[xroot].Rank > subsets[yroot].Rank)
          subsets[yroot].Parent = xroot;

        // If ranks are same, then make one as root and increment
        // its rank by one
        else
        {
          subsets[yroot].Parent = xroot;
          subsets[xroot].Rank++;
        }
      }

      
      public Edge[] Kruskal()
      {
        // This will store the resultant MST
        Edge[] mst = new Edge[VertexCount - 1];

        // Step 1: Sort all the edges in non-decreasing order of their weight
        // If we are not allowed to change the given graph, we can create a copy of
        // array of edges
        Console.WriteLine(this.Edges);
        var sortedEdges = this.Edges.OrderBy(t => t.Weight);
        var enumerator = sortedEdges.GetEnumerator();

        // Allocate memory for creating V ssubsets
        // Create V subsets with single elements
        Subset[] subsets = new Subset[VertexCount];
        for (int i = 0; i < subsets.Length; i++)
        {
          subsets[i] = new Subset();
          subsets[i].Parent = i;
          subsets[i].Rank = 0;
        }

        // Number of edges to be taken is equal to V-1
        int e = 0;
        while (e < VertexCount - 1)
        {
          // Step 2: Pick the smallest edge. And increment the index
          // for next iteration
          Edge nextEdge;
          if (enumerator.MoveNext())
          {

            nextEdge = enumerator.Current;
            
            int x = Find(subsets, nextEdge.Begin);
            int y = Find(subsets, nextEdge.End);

            // If including this edge does't cause cycle, include it
            // in result and increment the index of result for next edge
            if (x != y)
            {
              mst[e++] = nextEdge;
              Union(subsets, x, y);
            }
            else
            {
              // Else discard the nextEdge
            }
          }
        }

        return mst;
      }
    }
  }
}