%{
    
%}
%lex
%options case-insenstive
//REGEX
int [-]?[0-9]+
double [-]?[0-9]*[\.][0-9]+
char [\'][^\']?[\']
boolean "true"|"false"
string  [\"][^\"]*[\\\"]*[\"]
id [a-zA-Z0-9ñÑ][a-zA-Z0-9ñÑ_]*
incremento [\-\-]|[\+\+]
//operacionaritmetica [\+]|[\-]|[\*]|[\/]|[\*\*]|[\%]
comparacion [<=]|[<]|[>=]|[>]
tigualdad [!=]|[=]|[==]
verdad [\|\|]|[&&]|[\^]|[!]
%%
\s+ /*skip espacio enblanco*/
"//".* //comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] //comentario multiple lineas

//expresiones regulares
{double} return 'er_double'
{int} return 'er_int'
{char} return 'er_char'
{boolean} return 'er_boolean'
{string} return 'er_string'
{id} return 'er_id'
{incremento} return 'er_incremento'
{comparacion} return 'er_comparacion'
{tigualdad} return 'er_tigualdad'
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
":" return ':'
<<EOF>> return 'EOF'
.{
    console.log("error lexico :" yytext)
    //array.push()
}
/lex
%left '+' '-'
%left '*' '/'
%left '%'
%start INIT
%%
INIT: DECLARACION;

DECLARACION: TIPO_DECLARACION MOREMORE DECLARACIONES_ID '=' DECLARACION_EXPRESIONES ';'
|'er_id' DECLARACIONES_ID '=' 'pr_new' 'er_id' '(' DATOS_PARENTESIS_FUNCION ')' ';'
|'er_id' 'er_incremento' 
;

TIPO_DECLARACION:'pr_const' | 'pr_let' | 'pr_var'
;
MOREMORE:
'er_incremento' TIPO_DECLARACION
TIPO_DECLARACION 'er_incremento'
;

TIPODATO_DECLARACION: 'pr_int' | 'pr_string' | 'pr_double' | 'pr_char' |'pr_boolean'
;

DECLARACIONES_ID:DECLARACIONES_ID ',' 'er_id'
|'er_id'
;

DECLARACION_EXPRESIONES:EXPRESIONES
|EXPRECION_VARIABLE
;

EXPRESIONES: EXPRESIONES '+' EXPRESIONES
|EXPRESIONES '-' EXPRESIONES
|EXPRESIONES '*' EXPRESIONES
|EXPRESIONES '/' EXPRESIONES
|EXPRESIONES '%' EXPRESIONES
|EXPREION_VARIABLE
;

EXPRECION_VARIABLE:'er_int'|'er_double' | 'er_string' | 'er_char' | 'er_boolean'
;

DATOS_PARENTESIS_FUNCION:DECLARACIONES_ID
|DECLARACION_TIPODATO
;