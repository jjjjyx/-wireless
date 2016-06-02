#include <iostream>
using std::cin;
using std::cout;
using std::endl;

// 定义点坐标
struct Point
{ 
	double x;
	double y;
};

Point centerPoint(Point* array,const int point_size);

int main(int argc, char* argv[]){
  	const int point_size = 5; // 顶点个数
	Point array[point_size] = {{1,1}, {1,3}, {3,4}, {3.5,2},{5,1}}; //顶点数组  
	Point center = centerPoint(array,point_size);
	cout<<"输出图多边形重心:";
  	cout<<"("<<center.x <<", "<<center.y<<")"<<endl;
	return 0;
}
Point centerPoint(Point* array,const int point_size){
	double temp;
	double area=0;
	double cx = 0, cy = 0;
	for (int i = 0;i<point_size-1;i++){
		temp = array[i].x * array[i+1].y - array[i].y *array[i+1].x;
		area+= temp;
		cx+= temp * (array[i].x+array[i+1].x);
		cy+= temp * (array[i].y+array[i+1].y);
	}
	temp = array[point_size-1].x * array[0].y - array[point_size-1].y *array[0].x;
	area+= temp;
	cx+= temp * (array[point_size-1].x+array[0].x);
	cy+= temp * (array[point_size-1].y+array[0].y);

	area = area/2;
	cx = cx/(6*area);
	cy = cy/(6*area);

  	Point C = {cx,cy};
	return C;
}