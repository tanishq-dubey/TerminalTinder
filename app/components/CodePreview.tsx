import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { ColorScheme } from '../utils/colorSchemes';
import { CodeSample } from '../utils/types';

interface CodePreviewProps {
  scheme: ColorScheme;
  codeSample: CodeSample;
}

const CodePreview: React.FC<CodePreviewProps> = ({ scheme, codeSample }) => {
  const getCodeExample = () => {
    const samples = {
        c: `#include <stdio.h>

        int is_prime(int n) {
            if (n <= 1) return 0;
            for (int i = 2; i * i <= n; i++) {
                if (n % i == 0) return 0;
            }
            return 1;
        }
        
        void print_primes(int limit) {
            printf("Primes up to %d:\n", limit);
            for (int i = 2; i <= limit; i++) {
                if (is_prime(i)) {
                    printf("%d ", i);
                }
            }
            printf("\n");
        }
        
        int main() {
            int limit = 50;
            print_primes(limit);
        
            int num = 7;
            printf("Is %d prime? %s\n", num, is_prime(num) ? "Yes" : "No");
            return 0;
        }`,
              python: `import numpy as np
        
        @timeit
        def is_prime(n):
            if n <= 1:
                return False
            for i in range(2, int(n ** 0.5) + 1):
                if n % i == 0:
                    return False
            return True
        
        
        def primes_up_to(limit):
            """
            This function returns a list of prime numbers up to a given limit.
            """
            primes = []
            for i in range(2, limit + 1):
                if is_prime(i):
                    primes.append(i)
            return primes
        
        def fibonacci(n):
            fib_sequence = [0, 1] # Create a list with the first two numbers in the Fibonacci sequence
            for i in range(2, n):
                fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
            return fib_sequence
        
        limit = 50
        print(f"Primes up to {limit}: {primes_up_to(limit)}")
        print(f"Fibonacci sequence up to 10: {fibonacci(10)}")
        `,
              rust: `fn is_prime(n: u32) -> bool {
            if n <= 1 {
                return false;
            }
            for i in 2..=((n as f64).sqrt() as u32) {
                if n % i == 0 {
                    return false;
                }
            }
            true
        }
        
        fn primes_up_to(limit: u32) -> Vec<u32> {
            let mut primes = Vec::new();
            for i in 2..=limit {
                if is_prime(i) {
                    primes.push(i);
                }
            }
            primes
        }
        
        fn main() {
            let limit = 50;
            let primes = primes_up_to(limit);
            println!("Primes up to {}: {:?}", limit, primes);
        
            let num = 7;
            println!("Is {} prime? {}", num, is_prime(num));
        }`,
        java: `public class PrimeNumbers {
            public static boolean isPrime(int n) {
                if (n <= 1) return false;
                for (int i = 2; i <= Math.sqrt(n); i++) {
                    if (n % i == 0) return false;
                }
                return true;
            }
            
            public static void primesUpTo(int limit) {
                System.out.println("Primes up to " + limit + ":");
                for (int i = 2; i <= limit; i++) {
                    if (isPrime(i)) {
                        System.out.print(i + " ");
                    }
                }
                System.out.println();
            }
        `,
        
              go: `package main
        
        import (
            "fmt"
            "math"
        )
        
        func isPrime(n int) bool {
            if n <= 1 {
                return false
            }
            for i := 2; i <= int(math.Sqrt(float64(n))); i++ {
                if n%i == 0 {
                    return false
                }
            }
            return true
        }
        
        func primesUpTo(limit int) []int {
            primes := []int{}
            for i := 2; i <= limit; i++ {
                if isPrime(i) {
                    primes = append(primes, i)
                }
            }
            return primes
        }
        
        func main() {
            limit := 50
            fmt.Printf("Primes up to %d: %v\n", limit, primesUpTo(limit))
        
            num := 7
            fmt.Printf("Is %d prime? %v\n", num, isPrime(num))
        }`,
              javascript: `/* Calculate the area and circumference of a circle */
        const pi = 3.14;
        
        function calculateArea(r) {
          return pi * r ** 2;   // Exponentiation, constant, operator
        }
        
        function calculateCircumference(r) {
          return 2 * pi * r;     // Function, return, operators
        }
        
        if (radius > 0) {
          console.log(\`Area: $\{calculateArea(radius)\}\`);  // Template string, method
          console.log(\`Circumference: $\{calculateCircumference(radius)\}\`);
        } else {
          console.error("Invalid radius!");  // Error handling
        }
        
        try {
          radius = -1;
          if (radius < 0) throw new Error("Negative radius");  // Throw, error
        } catch (e) {
          console.warn(e.message);   // Catch block, method
        }`,
              bash: `#!/bin/bash
        
        is_prime() {
          local n=$1
          if [ $n -le 1 ]; then
            echo 0
            return
          fi
          for ((i=2; i*i<=n; i++)); do
            if ((n % i == 0)); then
              echo 0
              return
            fi
          done
          echo 1
        }
        
        primes_up_to() {
          local limit=$1
          for ((i=2; i<=limit; i++)); do
            if [ $(is_prime $i) -eq 1 ]; then
              echo -n "$i "
            fi
          done
          echo
        }
        
        limit=50
        echo "Primes up to $limit: $(primes_up_to $limit)"
        
        num=7
        if [ $(is_prime $num) -eq 1 ]; then
          echo "$num is prime"
        else
          echo "$num is not prime"
        fi`
    };

    return samples[codeSample] || samples.javascript;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-md overflow-x-auto">
      <Highlight theme={themes.dracula} code={getCodeExample()} language={codeSample}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} text-sm`} style={{ ...style, backgroundColor: scheme.colors.primary.background }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => {
                  let color = scheme.colors.primary.foreground;
                  if (token.types.includes('keyword')) color = scheme.colors.normal.blue;
                  if (token.types.includes('string')) color = scheme.colors.normal.green;
                  if (token.types.includes('number')) color = scheme.colors.normal.magenta;
                  if (token.types.includes('comment')) color = scheme.colors.bright.black;
                  if (token.types.includes('function')) color = scheme.colors.normal.yellow;
                  if (token.types.includes('operator')) color = scheme.colors.normal.cyan;
                  if (token.types.includes('class-name')) color = scheme.colors.bright.magenta;
                  if (token.types.includes('constant')) color = scheme.colors.bright.red;
                  if (token.types.includes('punctuation')) color = scheme.colors.bright.cyan;
                  if (token.types.includes('variable')) color = scheme.colors.bright.yellow;
                  if (token.types.includes('boolean')) color = scheme.colors.bright.yellow;
                  if (token.types.includes('builtin')) color = scheme.colors.bright.magenta;
                  if (token.types.includes('attr-name')) color = scheme.colors.normal.red;
                  if (token.types.includes('attr-value')) color = scheme.colors.bright.green;
                  if (token.types.includes('tag')) color = scheme.colors.normal.blue;
                  if (token.types.includes('namespace')) color = scheme.colors.normal.magenta;
                  if (token.types.includes('selector')) color = scheme.colors.normal.yellow;
                  if (token.types.includes('property')) color = scheme.colors.normal.cyan;
                  if (token.types.includes('unit')) color = scheme.colors.bright.yellow;
                  if (token.types.includes('important')) color = scheme.colors.bright.red;
                  if (token.types.includes('symbol')) color = scheme.colors.normal.magenta;        // Symbols (e.g., special characters)
                  if (token.types.includes('regex')) color = scheme.colors.bright.green;           // Regular expressions
                  if (token.types.includes('template-string')) color = scheme.colors.normal.green; // Template literals
                  if (token.types.includes('char')) color = scheme.colors.bright.yellow;           // Individual characters
                  if (token.types.includes('module')) color = scheme.colors.normal.cyan;           // Modules
                  if (token.types.includes('directive')) color = scheme.colors.normal.magenta;      // Directives (e.g., preprocessor)
                  if (token.types.includes('annotation')) color = scheme.colors.normal.green;      // Annotations (e.g., decorators)
                  if (token.types.includes('parameter')) color = scheme.colors.bright.yellow;      // Parameters in functions
                  if (token.types.includes('method')) color = scheme.colors.normal.yellow;         // Methods
                  if (token.types.includes('field')) color = scheme.colors.bright.blue;            // Fields within classes
                  if (token.types.includes('property-access')) color = scheme.colors.normal.cyan;  // Property accessors (e.g., dot notation)
                  if (token.types.includes('escape')) color = scheme.colors.bright.red;            // Escape sequences
                  if (token.types.includes('meta')) color = scheme.colors.bright.magenta;           // Meta information (e.g., HTML meta tags)
                  if (token.types.includes('label')) color = scheme.colors.bright.yellow;          // Labels (e.g., in loops)
                  if (token.types.includes('alias')) color = scheme.colors.normal.magenta;          // Aliases (e.g., imports or type aliases)
                  if (token.types.includes('error')) color = scheme.colors.bright.red;             // Error handling, error literals
                  if (token.types.includes('debug')) color = scheme.colors.bright.magenta;          // Debugging statements (e.g., console logs)
                  if (token.types.includes('property-declaration')) color = scheme.colors.normal.blue; // Property declarations in classes
                  if (token.types.includes('module-declaration')) color = scheme.colors.normal.cyan;   // Declarations of modules
                  if (token.types.includes('generic')) color = scheme.colors.bright.magenta;       // Generics (e.g., <T>)
                  if (token.types.includes('type')) color = scheme.colors.bright.blue;             // Types in TypeScript, Flow, etc.
                  if (token.types.includes('interface')) color = scheme.colors.normal.green;       // Interfaces (e.g., TypeScript)
                  if (token.types.includes('enums')) color = scheme.colors.bright.cyan;            // Enums in languages like TypeScript, Java
                  if (token.types.includes('modifier')) color = scheme.colors.normal.yellow;       // Modifiers (e.g., public, static)
                  if (token.types.includes('event')) color = scheme.colors.bright.blue;            // Events (e.g., DOM events or custom events)
                  if (token.types.includes('keyword-control')) color = scheme.colors.bright.yellow; // Control-flow keywords (e.g., if, for)
                  if (token.types.includes('loop')) color = scheme.colors.normal.magenta;           // Loop keywords (e.g., for, while)
                  if (token.types.includes('storage')) color = scheme.colors.normal.red;           // Storage-related keywords (e.g., var, let)
                  if (token.types.includes('annotation-function')) color = scheme.colors.bright.green; // Annotated functions
                  if (token.types.includes('doc-string')) color = scheme.colors.bright.blue;       // Docstrings or comments that are part of documentation
                  return <span key={key} {...getTokenProps({ token, key })} style={{ ...getTokenProps({ token, key }).style, color }} />;
                })}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodePreview;