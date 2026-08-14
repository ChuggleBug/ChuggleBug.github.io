---
layout: post
title:  "Fun C++26 Nonsense"
date:   2026-07-27 -0700
categories: C++
---

> Modern C++ looks really scary

A while ago I saw a post on Twitter that commented on the absurdity of modern C++. After a quick glance, this snippet's function seems  clear, but as soneone who has only ever used C++11 and sometimes C++20, a majority of programming concepts introduced here are somewhat novel to me.

<div style="display: flex; justify-content: center">
    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">C++26 reflection syntax looks abhorrent <a href="https://t.co/qhG8DQnJxU">pic.twitter.com/qhG8DQnJxU</a></p>&mdash; ♡ mari/cohe ♡ (@noinconsistency) <a href="https://x.com/noinconsistency/status/2080971155238719626?ref_src=twsrc%5Etfw">July 25, 2026</a></blockquote><script async src="https://platform.x.com/widgets.js" charset="utf-8"></script><script src="https://platform.x.com/widgets.js" async charset="utf-8"></script>
</div>

 
# The Code Itself

I've rewritten it in a way such that I am more comfortable reading and for redundancy if the tweet ever dissapears:

```cpp
struct Range { 
    int lo
    int hi 
};

struct Config {
    [[=Range{1,   65535}]]  int port;
    [[=Range{1,   256}]]    int max_threads;
    [[=Range{100, 30000}]]  int timeout_ms;
};

template <typename T>
constexpr bool validate(const T& obj) {
    constexpr auto context = std::meta::access_context::current();
    template for (constexpr auto member : define_static_array( nonstatic_data_members_of(^^T, context) )) {
        template for (constexpr auto annotation : define_static_array( annotations_of_with_type(member, ^^Range) )) {
            auto [lo, hi] = extract<Range>(annotation);
            if (obj.[:member:] < lo || obj.[:member:] > hi) {
                return false;
            }
        }
    }

    return true;
}

static_assert( validate(Config{100, 50, 20000}) );
static_assert( validate(Config{0, 0, 0}) );
```

## How Each Component Works

<!-- <code class="langauge-plaintext"></code>: -->
`struct Range`: This is just a plain struct. Nothing special.

`struct Config`: This is also just a plain `struct`, with the exception that its data members have the [**annotation**](https://en.cppreference.com/cpp/language/annotations) `Range`

<code class="langauge-plaintext">[:<i>attribute-list</i>:]</code>: This is the standard [**attribute syntax**](https://en.cppreference.com/cpp/language/attributes) for C++. This is the same as <code class="langauge-plaintext">__attribute__((<i>attribute-list</i>))</code>

<code class="langauge-plaintext">[:=<i>constant-expression</i>:]</code>: This is the [**annotation syntax**](https://en.cppreference.com/cpp/language/annotations). It uses the same syntax as attributes.

`template <typename T>`: A templated function. This just allows for the creation of generic functions, which can support multiple types.

`constexpr`: A specifier that indicates that whatever variable/function can appear in [**constant expressions**](https://en.cppreference.com/cpp/language/constant_expression). These constant expressions can be evaluated at compile time. The fact this can be done is the whole reason that `validate` can be used with `static_assert`.

`std::meta::access_context::current()`: Access contet is a bit weird to explain, but the best way to think of this is that the `access_context` is meant to represent what the current scope is able to see. For example, in the code example above, the current `context` is able to see all public member variables of `Config`. If `Config` had a private member variable, then `nonstatic_data_members_of` would not include it in the vector is returns.

`template for`: A special type of `for` loop that can can iterate over hetergenous containers. This [expansion](https://cppreference.com/cpp/language/template_for) is done at compile time by "unrolling" the loop to handle each type correctly. 

```cpp
auto tuple = std::make_tuple( "Hello", 42 );

template for (const auto &t: tuple) {
    std::cout << t << std::endl;
}
```

could expand to 


```cpp
auto tuple = std::make_tuple( "Hello", 42 );

// Calls std::cout(std::string)
std::cout << std::get<0>(tuple) << std::endl; 
// Calls std::cout(int)
std::cout << std::get<1>(tuple) << std::endl;
```

`std::define_static_array`: This is able to convert a ranged object (like a vector) into a `std::span`, which can be known at compile time.

`^^` operator: This is the **reflection operator**, which returns a `std::meta::info` of whatever it is applied to.

`std::meta::nonstatic_data_members_of`: As the name implies, this returns a vector of reflections types for all of the non-static data members of whatever class specified within the current access context. For example, `nonstatic_data_members_of(^^Config, std::meta::access_context::current())` would return reflections for `port`, `max_threads`, and `timeout_ms`.

`std::meta::annotations_of_with_type`: This is an alternate function to `std::meta::annotations_of` that extracts all the annotations of a reflection that match the given reflection type. In this case, if `member` had more than one annotation, `annotations_of_with_type(member, ^^Range)` would only return a vector of only the annotation `Range`.


`std::meta::extract`: This creates a `T` object based on the annotation. In this case, it creates a `Range`, which is unpacked into `lo` and `hi`.

<code class="langauge-plaintext">[<i>sb-identifier-list</i>] <i>initializer</i></code>: This is one part of the [**structured binding declaration**](https://en.cppreference.com/cpp/language/structured_binding). This is similar to unpacking in other languages where `lo` and `hi` are bound to the values extracted from `extract(annotation)`

<code class="langauge-plaintext">[:<i>constant-expression</i>:]</code>: This is a [**splice specifier**](https://cppreference.com/cpp/language/splice_specifiers). This syntax is able to tranform a reflection back into real source code. For example, if `member` was a reflectio of `max_threads` then `obj.[:member:]` would refer to `obj.max_threads`.

`static_assert`: This is just a compile time assertion. Because the `validate` is a `constexpr` function, the function is evaluated as true or false when compiling and is checked.


## Putting it all Together

All that the snippet does is provide a clean way to ensure that all of the data members of each `Config` being validated is within its specified `Range` during compile time. 

While this can can be done during runtime, there are some clear benefits to this approach:

1. It's done at compile time. There is not overhead needed when the program starts. Although the overhead here would be minor, as more objects need to be validated, this overhead would increase.
2. This is easily extendable. Suppose that a new struct was made

```cpp
struct MyCharacter {
    [[=Range{'a', 'z'}]] char letter;
};
```

The range annotation can still be used here with no modification to `validate`. This is partly because of generic functions, but also because the use of reflections allow for the checking of any member variable regardless of name.


# Putting this into Practice

## The Goal
In Python, when printing a namedtuple, it comes out as a pretty string with the class name and all of the member variables. For example:

```python
>>> from collections import namedtuple
>>> A = namedtuple("A", ["x", "y"])
>>> a = A(5, 6)
>>> a
A(x=5, y=6)
```

Now this is possible in C++, but would require a lot of work, especially if this serialization work is performed for a variety of classes.

## The Solution

With a little help from `identifier_of`, `display_string_of`, and following a similar pattern of the code in the previous section, we can produce this:

```cpp
template <typename T> 
std::string pretty_serialize(T obj) {
    constexpr auto ctx = std::meta::access_context::current();

    std::string serialized{std::meta::display_string_of(^^T)};
    serialized += "{";

    // Print out all member variables
    static constexpr auto members = std::define_static_array( std::meta::nonstatic_data_members_of(^^T, ctx) );
    std::size_t i = 0;
    template for (constexpr auto member : members) {
        serialized += std::meta::identifier_of(member);
        serialized += "=";
        serialized += std::format("{}", obj.[:member:]);
        
        // Last element check
        if (i++ + 1 != members.size()) {
            serialized += ", ";
        }
    }
    serialized += "}";

    return serialized;
}
```

This function simply constructs a pretty representation of the the variable. In addition to getting the actual value by using `[:member:]`, `display_string_of` is used to get the complete name of type `T` (e.g. the display string of `string` is `std::string {aka std::__cxx11::basic_string<char>}`), and `identifier_of` is very similar to `display_string_of`, but returns a simpler string (e.g. `display_string_of` of `T::val` is `"T::val"`, but its `identifier_of` is `val`).

### Example[^1]

```cpp
struct CustomObject {
    int id;
    std::string name;
};


template <typename T> 
struct TemplateObject {
    int value;
    T obj;
};

typedef CustomObject horse;


using namespace std;

int main() {

    auto object = CustomObject{5, "apple"};
    auto template_object = TemplateObject{10, "horse"};

    std::cout << pretty_serialize(object) << std::endl;
    std::cout << pretty_serialize(template_object) << std::endl;

    return 0;
}
```

```text
# Output
CustomObject{id=5, name=apple}
TemplateObject<const char*>{value=10, obj=horse}
```


[^1]: This solution does not handle every edge case. For example, it will not correctly handle recursive serialization, as it relies on `std::format` and does not call `pretty_serialize` again.