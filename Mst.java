import java.util.ArrayList;
import java.util.Collections;

class Bian implements Comparable //两点之间的加权边
{
	private int first,second;//表示一条边的两个节点
	private int value;//权值
	
	public Bian(int first, int second, int value)
	{
		this.first = first;
		this.second = second;
		this.value = value;
	}
	public int getFirst()
	{
		return first;
	}
	public int getSecond()
	{
		return second;
	}
	public int getValue()
	{
		return value;
	}
	@Override
	public int compareTo(Object arg0)
	{
		return value > ((Bian)arg0).value?1:(value == ((Bian)arg0).value?0:-1);
	}
	@Override
	public String toString()
	{
		return "Bian [first=" + first + ", second=" + second + ", value="
				+ value + "]";
	}
	
}
class ShuZu
{
	static ArrayList<ArrayList> list = new ArrayList<ArrayList>();//存放每一个数组中的节点的数组
	static ArrayList<ArrayList> bianList = new ArrayList<ArrayList>();//对应存放数组中的边的数组
	public static void check(Bian b)//检查在哪个数组中
	{
		if(list.size() == 0)
		{
			ArrayList<Integer> sub = new ArrayList<Integer>();
			sub.add(b.getFirst());
			sub.add(b.getSecond());
			list.add(sub);
			ArrayList<Bian> bian = new ArrayList<Bian>();
			bian.add(b);
			bianList.add(bian);
			return;
		}
		int first = b.getFirst();
		int shuyu1 = -1;
		int second = b.getSecond();
		int shuyu2 = -1;
		for(int i = 0;i<list.size();i++)//检查两个节点分别属于哪个数组
		{
			for(int m = 0;m<list.get(i).size();m++)
			{
				if(first == (Integer)list.get(i).get(m))
					shuyu1 = i;
				if(second == (Integer)list.get(i).get(m))
					shuyu2 = i;
			}
		}
		if(shuyu1 == -1 && shuyu2 ==-1)//表示这两个节点都没有需要新加入
		{
			ArrayList<Integer> sub = new ArrayList<Integer>();
			sub.add(b.getFirst());
			sub.add(b.getSecond());
			list.add(sub);
			ArrayList<Bian> bian = new ArrayList<Bian>();
			bian.add(b);
			bianList.add(bian);
		}
		if(shuyu1 == -1 && shuyu2 != -1)//表示有一个点已经在数组中只把另一个加入就可以了
		{
			list.get(shuyu2).add(first);
			bianList.get(shuyu2).add(b);
		}
		if(shuyu2 == -1 && shuyu1 != -1)//表示有一个点已经在数组中只把另一个加入就可以了
		{
			list.get(shuyu1).add(first);
			bianList.get(shuyu1).add(b);
		}
		if(shuyu1 == shuyu2 && shuyu1 != -1)//表述两个在同一个组中 会形成环
		{
			
		}
		if(shuyu1 != shuyu2 && shuyu1 != -1 && shuyu2 != -1)//表示两个点在不同的组中 需要合并
		{
			for(int i = 0;i<list.get(shuyu2).size();i++)
			{
				list.get(shuyu1).add(list.get(shuyu2).get(i));
			}
			list.remove(shuyu2);
			for(int i = 0;i<bianList.get(shuyu2).size();i++)
			{
				bianList.get(shuyu1).add(bianList.get(shuyu2).get(i));
			}
			bianList.get(shuyu1).add(b);
			bianList.remove(shuyu2);
		}
	}
	public static void show()
	{
		for(int i = 0;i<bianList.get(0).size();i++)
			System.out.println(bianList.get(0).get(i));
	}
}
public class ZuiXiaoShu2
{
	public static void main(String[] args)
	{
		ArrayList<Bian> l = new ArrayList<Bian>();
		l.add(new Bian(1,3,1));
		l.add(new Bian(1,2,6));
		l.add(new Bian(1,4,5));
		l.add(new Bian(2,3,5));
		l.add(new Bian(2,5,3));
		l.add(new Bian(3,4,5));
		l.add(new Bian(3,5,6));
		l.add(new Bian(3,6,4));
		l.add(new Bian(4,6,2));
		l.add(new Bian(5,6,6));
		Collections.sort(l);
//		for(int i = 0 ;i<l.size();i++)
//			System.out.println(l.get(i));
		for(int i = 0 ;i<l.size();i++)
			ShuZu.check(l.get(i));
		ShuZu.show();
	}
}
