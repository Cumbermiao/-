#include <stdio.h>
#include <string.h>

#if 0
int main(){
  float P = 123.3015;
  printf("%.3f",P);
}
#endif

#if 0
int main(){
  char ch;
  char *p = &ch;
  *p = 'x';
  printf("%c,%c",*p,ch);
  p++;
  printf("%p",p);
}
#endif

#if 1
struct Student
{
  char name[10];
  int age;
  char sex[10];
};

void modify(struct Student *stu){
  printf("stu area:%p,%p,%p,%p,%p\n",stu,*stu,&(stu->name),&(stu->sex),&(stu->age));
  strcpy((stu->name),"LI");
  strcpy((stu->sex),"virgin");
  stu->age = 0;
}



int main(){
  struct Student student;
  struct Student *p = &student;
  strcpy(student.name,"miao");
  strcpy(student.sex,"male");
  student.age = 27;
  printf("student:%s,%s,%d\n",student.name,student.sex,student.age);
  printf("student area:%p,%p,%p,%p\n",&student,&(student.name),&(student.sex),&(student.age),*p);
  modify(&student);
  printf("modifid student:%s,%s,%d\n",student.name,student.sex,student.age);

}
#endif