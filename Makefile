all: cv.pdf

cv.pdf: *.tex
	pdflatex --shell-escape --synctex=1 cv
#	bibtex cv
#	pdflatex --shell-escape --synctex=1 cv
#	pdflatex --shell-escape --synctex=1 cv

clean:
	rm -f *.bak
	rm -f *~
	rm -f *.pdf *.log *.aux *.bbl *.blg \#* *.dvi *.gz *.out
