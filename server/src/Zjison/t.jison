//TT;;TITULO
%{
    //codigo en JS
    //importaciones y declaraciones
    //const {} = require('');
    const {Aritmetica} = require('../Tipos/matetica');
    const {LiteralVar} = require('../Tipos/literalVar');
    const {incremento}= require('../funcionesEx/incremento');
    let ids=[]
%}
%lex
%options case-insensitive
int [-]?[0-9]+
double [-]?[0-9]*[\.][0-9]+
char [\'][^\']?[\']
boolean "true"|"false"
string  [\"][^\"]*[\\\"]*[\"]
//id [a-zA-Z0-9ñÑ][a-zA-Z0-9ñÑ_]*
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

[a-zA-ZñÑ][a-zA-Z0-9_ñÑ]*	return 'er_id';
<<EOF>>		            return 'EOF'

.   { 
        console.log("error lexico :"+yytext)
        //push para array errores
    }

/lex
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

EXPRESIONES: EXPRESIONES '+' MOREMORE {$$= new Arithmetic($1,$3,ArithmeticOption.MAS, @1.first_line, @1.first_column);}
|EXPRESIONES '-' MOREMORE {$$= new Arithmetic($1,$3,ArithmeticOption.MENOS, @1.first_line, @1.first_column);}
|EXPRESIONES '*' MOREMORE {$$= new Arithmetic($1,$3,ArithmeticOption.MULTIPLICACION, @1.first_line, @1.first_column);}
|EXPRESIONES '/' MOREMORE {$$= new Arithmetic($1,$3,ArithmeticOption.DIV, @1.first_line, @1.first_column);}
|EXPRESIONES '%' MOREMORE
|EXPRESIONES '**' MOREMORE
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

TIPO_DECLARACION:'pr_const'{$$=$1;}
| 'pr_let' {$$=$1;}
| 'pr_var'{$$=$1;}
;

TIPODATO_DECLARACION: 'pr_int' {$$=$1;}
| 'pr_string' {$$=$1;}
| 'pr_double' {$$=$1;} 
| 'pr_char' {$$=$1;}
|'pr_boolean' {$$=$1;}
;

EXPRECION_VARIABLE:er_int {$$=new Literal($1,Type.NUMBER , @1.first_line, @1.first_column)} 
|er_double  {$$=new Literal($1,Type.DOUBLE , @1.first_line, @1.first_column)}
| er_string {$$=new Literal($1,Type.STRING , @1.first_line, @1.first_column)} 
| er_char  {$$=new Literal($1,Type.CHAR , @1.first_line, @1.first_column)}
| er_boolean {$$=new Literal($1,Type.BOOLEAN, @1.first_line, @1.first_column)}
;

MOREMORE:
er_incremento EXPRECION_VARIABLE//{$$= tt=incremento($1+$2);}
|EXPRECION_VARIABLE er_incremento//{$$= tt=incremento($1+$2);}
|EXPRECION_VARIABLE{$$=$1}
;
MOREMORE_AUX:
;
//BLOQUE NORMAL--------------------------------
DECLARACION: TIPO_DECLARACION DECLARACION_AUXA
|DECLARACION_AUXA
/*|'er_id' DECLARACIONES_ID '=' 'pr_new' 'er_id' '(' DATOS_PARENTESIS_FUNCION ')' ';'
|'er_id' er_incremento ';'
|er_incremento 'er_id' ';'*/
;
DECLARACION_AUXA:TIPODATO_DECLARACION DECLARACIONES_ID '=' EXPRESIONES ';'
{
    for(i=0;i<=ids.length+1;i++){
        $$= new Declaracion($3,$1,$5,@1.first_line, @1.first_column );
    } 
}
;


DECLARACIONES_ID:DECLARACIONES_ID ',' 'er_id'{$$=ids.push($3)}
|'er_id'{$$=ids.push($1)}
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
|CASE_FINAL
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
'pr_for' '(' NO_INT 'er_id' '=' EXPRECION_VARIABLE ';' 'er_id' er_comparacion EXPRECION_VARIABLE ';' EXPRESIONES ')' '{' /*FIXME:instrucciones*/
;

NO_INT:
TIPODATO_DECLARACION
|%empety
;

DECLARACION_WHILE:
WHILE_WHILE '{' /*FIXME:instrucciones*/ '}'
'pr_do' '{' /*FIXME:instrucciones*/ WHILE_WHILE
;

WHILE_COMPARACION:er_boolean
|EXPRESIONES
;

WHILE_WHILE:
'pr_while' '(' WHILE_COMPARACION ')'
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

NADA:')';

//CALL--------------------------------
DECLARACION_CALL:
'pr_call' 'er_id' '(' DECLARACION_EXP_VAR ')' ';'
;

DECLARACION_EXP_VAR:
DECLARACION_EXP_VAR ',' EXPRECION_VARIABLE
|EXPRECION_VARIABLE
|NADA
;