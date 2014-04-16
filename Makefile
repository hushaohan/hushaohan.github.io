target = cv

all: $(target).pdf

$(target).pdf: *.tex Makefile
	latexmk -pdf -pdflatex="pdflatex -shell-escape -file-line-error --synctex=1" -use-make $(target)

clean: nojunks
	latexmk -C

tidy: nojunks
	latexmk -c

nojunks:
	rm -f $(target).synctex.gz .DS_Store *~ \#*