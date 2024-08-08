from math import floor, inf, sqrt
from collections import defaultdict
import sys

def yn(cond):
    if cond:return 'YES'
    return 'NO'
def ip(num=0):
    return list( map(int, sys.stdin.readline().strip().split())) if not num  else [int(i) for i in (list(sys.stdin.readline().strip()))]
def simple_sieve(limit):
    sieve = [True] * (limit + 1)
    sieve[0] = sieve[1] = False
    
    for start in range(2, int(sqrt(limit)) + 1):
        if sieve[start]:
            for multiple in range(start * start, limit + 1, start):
                sieve[multiple] = False
                
    primes = [num for num, is_prime in enumerate(sieve) if is_prime]
    return primes

def solve():
    n = ip()[0]
    ar = ip()
    seive = simple_sieve(floor((sqrt(10**12))+2))
    ans   = set()
    for i in seive:
        ans.add(i*i)
    
    for i in ar:
        print(yn(i in ans ))
        
    
    


T = 1
# T = int(input())

for _ in range(T):
    solve()
        
        
            
        
        
        