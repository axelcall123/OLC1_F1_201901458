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
//comparacion [<=]|[<]|[>=]|[>]|[!=]|[==]
//verdad [\|\|]|[&&]|[\^]|[!]
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
//{comparacion} return 'er_comparacion'
//{verdad} return 'er_verdad'
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

"**" return '**'
"<=" return '<='
"<" return '<'
">=" return '>='
">" return '>'
"!=" return '!='
"==" return '=='
"||" return '||'
"&&" return '&&'
"^" return '^'

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
%left '!'
%left '*' '/' '%'
%left '+' '-'
%left '>' '<' '>=' '<=' '==' '!='
%left '^'
%left '&&'
%left '||'
%start INIT
%%
INIT:  DECLARACION;
//GENERAL
/*DECLARACION_EXPRESIONES:EXPRESIONES
|EXPRECION_VARIABLE
;*/

EXPRESIONES: EXPRESIONES '+' MOREMORE{$$= new Aritmetica($1,$3,ArithmeticOption.MAS, @1.first_line, @1.first_column)}
|EXPRESIONES '-' MOREMORE{$$= new Aritmetica($1,$3,ArithmeticOption.MENOS, @1.first_line, @1.first_column)}
|EXPRESIONES '*' MOREMORE{$$= new Aritmetica($1,$3,ArithmeticOption.MULTIPLICACION, @1.first_line, @1.first_column)}
|EXPRESIONES '/' MOREMORE{$$= new Aritmetica($1,$3,ArithmeticOption.DIVISION, @1.first_line, @1.first_column)}
|EXPRESIONES '%' MOREMORE{$$= new Aritmetica($1,$3,ArithmeticOption.MODULAR, @1.first_line, @1.first_column)}
|EXPRESIONES '**' MOREMORE{$$= new Aritmetica($1,$3,ArithmeticOption.ELEVAR, @1.first_line, @1.first_column)}
|EXPRESIONES '<=' MOREMORE
|EXPRESIONES '<' MOREMORE
|EXPRESIONES '>=' MOREMORE
|EXPRESIONES '>' MOREMORE
|EXPRESIONES '!=' MOREMORE
|EXPRESIONES '==' MOREMORE
|EXPRESIONES '||' MOREMORE
|EXPRESIONES '^' MOREMORE
|MOREMORE {$$=$1}
;

TIPO_DECLARACION:'pr_const' | 'pr_let' | 'pr_var'
;

TIPODATO_DECLARACION: 'pr_int' | 'pr_string' | 'pr_double' | 'pr_char' |'pr_boolean'
;

EXPRECION_VARIABLE:'er_int' {$$=new Literal($1,Type.INT , @1.first_line, @1.first_column)}
|'er_double' {$$=new Literal($1,Type.DOUBLE , @1.first_line, @1.first_column)}
| 'er_string' {$$=new Literal($1,Type.STRING , @1.first_line, @1.first_column)}
| 'er_char' {$$=new Literal($1,Type.CHAR , @1.first_line, @1.first_column)}
| 'er_boolean' {$$=new Literal($1,Type.BOLEAN , @1.first_line, @1.first_column)}
;

MOREMORE:
'er_incremento' EXPRECION_VARIABLE
|EXPRECION_VARIABLE 'er_incremento'
|EXPRECION_VARIABLE{$$=$1}
;
MOREMORE_AUX:
;
//BLOQUE NORMAL--------------------------------
DECLARACION: TIPO_DECLARACION DECLARACIONES_ID '=' EXPRESIONES ';'
|'er_id' DECLARACIONES_ID '=' 'pr_new' 'er_id' '(' DATOS_PARENTESIS_FUNCION ')' ';'
|'er_id' 'er_incremento' 
;

DECLARACIONES_ID:DECLARACIONES_ID ',' 'er_id'
|'er_id'
;

DATOS_PARENTESIS_FUNCION:DECLARACIONES_ID
|DECLARACION_TIPODATO
;

DECLARACION_TIPODATO:
DECLARACIONES_ID ',' TIPODATO_DECLARACION
|TIPODATO_DECLARACION
;


//CONDICIONES--------------------------------
DECLARACION_CONDICIONAL:AUXA_IF 'pr_else' AUX_PARENTESIS_IF
|AUXB_IF 'pr_else' AUX_SPARENTESIS_IF
|AUX_IF_F AUX_SPARENTESIS_IF
|AUX_IF_F AUX_PARENTESIS_IF
;
AUX_PARENTESIS_IF:
'{' /*FIXME:instrucciones*/ '}'
;

AUX_SPARENTESIS_IF:
/*FIXME:instrucciones*/ ';'
;

AUXA_IF:
AUX_IF_F AUX_PARENTESIS_IF
|AUXA_IF 'pr_else' AUX_IF_F AUX_PARENTESIS_IF
;

AUXB_IF:
AUX_IF_F AUX_SPARENTESIS_IF
|AUXB_IF 'pr_else' AUX_IF_F AUX_SPARENTESIS_IF
;

AUX_IF_F:
'pr_if' '(' EXPRESIONES ')'
;

COMPUERTAS_L:
COMPUERTAS_L 'er_comparacion' EXPRECION_VARIABLE
|EXPRECION_VARIABLE
;

//SWITCH--------------------------------
DECLARACION_SWITCH:
'pr_switch' '(' TIPODATO_DECLARACION ')' '{' INSTRUCCION_CASE '}'
;

INSTRUCCION_CASE:
INSTRUCCION_CASE 'pr_case' TIPODATO_DECLARACION AUX_SWITCH
|DEFAULT_CASE
;

DEFAULT_CASE:
CASE_FINAL 'pr_default' AUX_SWITCH
; 

CASE_FINAL:
'pr_case' TIPODATO_DECLARACION AUX_SWITCH
|CASE_FINAL pr_case TIPODATO_DECLARACION AUX_SWITCH
;

AUX_SWITCH:
':' /*FIXME:instrucciones*/ ';' INSTRUCCION_BREAK ';'
;

INSTRUCCION_BREAK:pr_break
|%empety
;
//FOR--------------------------------
DECLARACION_FOR:
'pr_for' '(' NO_INT 'er_id' '=' TIPODATO_DECLARACIO ';' 'er_id' 'er_comparacion' TIPODATO_DECLARACIO ';' EXPRESIONES ')' '{' /*FIXME:instrucciones*/
;

NO_INT:
TIPODATO_DECLARACION
|%empety
;

DECLARACION_WHILE:
'pr_while' '(' WHILE_COMPARACION ) '{' /*FIXME:instrucciones*/ '}'
;

WHILE_COMPARACION:'er_boolean'
|EXPRESIONES
;

WHILE_WHILE:
'pr_while' '(' WHILE_COMPARACION )
;
//FUNCIONES--------------------------------
DECLARACION_FUNCION:
TIPO_METODO 'er_id' '(' DECLARACION_TIPO_DATO ')' '{' /*FIXME:instrucciones*/'}'
;

TIPO_METODO:
'pr_void' TIPODATO_DECLARACION
;


DECLARACION_TIPO_DATO:
DECLARACION_TIPO_DATO ',' TIPODATO_DECLARACION EXPRECION_VARIABLE
|TIPODATO_DECLARACION EXPRECION_VARIABLE
|NADA
;

NADA:;

//CALL--------------------------------
DECLARACION_CALL:
'pr_call' 'er_id' '(' DECLARACION_EXP_VAR ')' ';'
;

DECLARACION_EXP_VAR:
DECLARACION_EXP_VAR ',' EXPRECION_VARIABLE
|EXPRECION_VARIABLE
|NADA
;