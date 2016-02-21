The Java Compiler's Silent Code Modifications

Did you know the code you wrote isn't the code that's run? Mind, blown.
* super() inserted
* autoboxing/unboxing casts and conversions
* synthetic inner type accessor insertion
* eliding of static types and preevaluation of expressions (i.e. strings)  (leads to comparator failures at runtime!)

Use the pretty print to show decompiled full code.

Show how static strings can fail because precompiled at compile time, so comparisons no longer hold. 
