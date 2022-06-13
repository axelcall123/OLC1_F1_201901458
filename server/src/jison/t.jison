%{
    //codigo en JS
    //importaciones y declaraciones
%}
%lex
%options case-insensitive
int [-]?[0-9]+
double [-]?[0-9]*[\.][0-9]+
char [\'][^\']?[\']
boolean "true"|"false"
string  [\"][^\"]*[\\\"]*[\"]
id [a-zA-Z0-9ñÑ][a-zA-Z0-9ñÑ_]*
incremento [\-\-]|[\+\+]
//operacionaritmetica [\+]|[\-]|[\*]|[\/]|[\*\*]|[\%]
comparacion [<=]|[<]|[>=]|[>]|[!=]|[==]
verdad [\|\|]|[&&]|[\^]|[!]
%%
\s+                   /* skip whitespace */
"//".*                // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas
//expresiones regulare
{double} return 'er_double'
{int} return 'er_int'
{char} return 'er_char'
{boolean} return 'er_boolean'
{string} return 'er_string'
{id} return 'er_id'
{incremento} return 'er_incremento'
{comparacion} return 'er_comparacion'
{verdad} return 'er_verdad'
//palabras reservadas
"int" return 'pr_int'
"string" return 'pr_string'
"double" return 'pr_double'
"boolean" return 'pr_boolean'
"char" return 'pr_char'
"const" return 'pr_const'
"let" return 'pr_let'
"var" return 'pr_var'
"if" return 'pr_if'
"else" return 'pr_else'
"switch" return 'pr_switch'
"case" return 'pr_case'
"break" return 'pr_break'
"for" return 'pr_for'
"while" return 'pr_while'
"do" return 'pr_do'
"continue" return 'pr_continue'
"void" return 'pr_void'
"call" return 'pr_call'
"return" return 'pr_return'
"println" return 'pr_println'
"print" return 'pr_print'
"type" return 'pr_type'
"new" return 'pr_new'
'default' return 'pr_default'
//simbolos
"+" return '+'
"-" return '-'
"*" return '*'
"+" return '+'
"/" return '/'
"%" return '%'
"," return ','
"(" return '('
")" return ')'
"{" return '{'
"}" return '}'
":" return ':'
"=" return '='
<<EOF>>		            return 'EOF'

.   { 
        console.log("error lexico :"+yytext)
        //push para array errores
    }

/lex
%left 'er_incremento'
%left '+' '-'
%left '*' '/'
%left '%'
%start INIT
%%
INIT: '*';