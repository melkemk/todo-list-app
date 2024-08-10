from bisect import bisect_left, bisect_right
from cmath import inf, sqrt
from collections import defaultdict
from itertools import accumulate
import sys

def yn(cond):
    if cond:return 'YES'
    return 'NO'
def ip(num=0):
    return list( map(int, sys.stdin.readline().strip().split())) if not num  else [int(i) for i in (list(sys.stdin.readline().strip()))]
ar = [1]
i = 1
while i<2*10**5+10:
    ar.append(i*3)
    i*=3 
print(ar)
def solve():
    l,r = ip()
    LE = bisect_right(ar,l)
    ans = 0 
    i = r  
    j = bisect_left(ar,r) 
    while i>=l:
        print(i-3**bisect_left(ar,i),i,j) 
        j-=1 
        ans += (i-3**bisect_left(ar,i))*(bisect_right(ar,i) )
        i = (3**j)-1 
    print(ans)
        
    


T = 1
T = int(input())

for _ in range(T):
    solve()
        
        
            
        
        
        